import { useState, useEffect } from "react";

interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
}

// Generate years 1920-1999
const YEARS = Array.from({ length: 80 }, (_, i) => (1999 - i).toString());

export const useVehicleData = () => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");

  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [trims, setTrims] = useState<string[]>([]);

  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  // Fetch makes when year changes
  useEffect(() => {
    if (!year) {
      setMakes([]);
      setMake("");
      return;
    }

    setLoadingMakes(true);
    setMake("");
    setModel("");
    setTrim("");

    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`)
      .then((res) => res.json())
      .then((data) => {
        const makeNames = data.Results
          .map((m: VehicleMake) => m.MakeName)
          .sort((a: string, b: string) => a.localeCompare(b));
        setMakes(makeNames);
      })
      .catch(() => setMakes([]))
      .finally(() => setLoadingMakes(false));
  }, [year]);

  // Fetch models when make changes
  useEffect(() => {
    if (!year || !make) {
      setModels([]);
      setModel("");
      return;
    }

    setLoadingModels(true);
    setModel("");
    setTrim("");

    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}/vehicletype/car?format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const modelNames = data.Results
          .map((m: VehicleModel) => m.Model_Name)
          .sort((a: string, b: string) => a.localeCompare(b));
        setModels(modelNames);
      })
      .catch(() => setModels([]))
      .finally(() => setLoadingModels(false));
  }, [year, make]);

  // Trims - NHTSA doesn't have great trim data, so we provide Unknown as default
  useEffect(() => {
    if (!model) {
      setTrims([]);
      setTrim("");
      return;
    }
    setTrims(["Unknown", "Base", "Sport", "Deluxe", "Custom", "Limited"]);
    setTrim("");
  }, [model]);

  const isVehicleSelected = year && make && model;

  return {
    years: YEARS,
    year, setYear,
    makes, make, setMake,
    models, model, setModel,
    trims, trim, setTrim,
    loadingMakes, loadingModels,
    isVehicleSelected,
  };
};
