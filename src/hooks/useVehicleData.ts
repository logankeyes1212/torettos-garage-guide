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

// Common trims for classic cars
const CLASSIC_TRIMS = [
  "Unknown",
  "Base",
  "Standard",
  "Deluxe",
  "Custom",
  "Sport",
  "Special",
  "Super",
  "Limited",
  "GT",
  "SS",
  "RS",
  "SE",
  "LE",
  "GS",
  "STX",
  "GL",
  "GLS",
  "Convertible",
  "Hardtop",
  "Station Wagon",
  "Coupe",
  "Sedan",
];

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

  // Fetch makes when year changes — use GetMakesForManufacturerAndYear for accurate year filtering
  useEffect(() => {
    if (!year) {
      setMakes([]);
      setMake("");
      setModel("");
      setTrim("");
      return;
    }

    setLoadingMakes(true);
    setMake("");
    setModel("");
    setTrim("");

    // This endpoint returns all makes that had vehicles in a specific model year
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const yearNum = parseInt(year);
        // Filter out manufacturers that didn't exist in that era
        const allMakes: string[] = data.Results.map((m: VehicleMake) => m.MakeName);

        // Apply era-appropriate filtering
        const filtered = allMakes.filter((name) => {
          const n = name.toUpperCase();
          // Remove obviously modern brands for classic era
          if (yearNum < 1950) {
            const modernBrands = ["TESLA", "ACURA", "INFINITI", "LEXUS", "SATURN", "GEO", "SCION", "HUMMER", "ISUZU LIGHT"];
            if (modernBrands.some((b) => n.includes(b))) return false;
          }
          if (yearNum < 1970) {
            const post70Brands = ["TESLA", "ACURA", "INFINITI", "LEXUS", "SATURN", "GEO", "SCION", "HUMMER"];
            if (post70Brands.some((b) => n.includes(b))) return false;
          }
          if (yearNum < 1990) {
            const post90Brands = ["TESLA", "SCION"];
            if (post90Brands.some((b) => n.includes(b))) return false;
          }
          return true;
        });

        const sorted = filtered.sort((a, b) => a.localeCompare(b));
        setMakes(sorted);
      })
      .catch(() => setMakes([]))
      .finally(() => setLoadingMakes(false));
  }, [year]);

  // Fetch models when make changes
  useEffect(() => {
    if (!year || !make) {
      setModels([]);
      setModel("");
      setTrim("");
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
        const yearNum = parseInt(year);
        // If no results returned (old year), fall back to all models for that make
        if (!data.Results || data.Results.length === 0) {
          return fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(make)}?format=json`
          )
            .then((r) => r.json())
            .then((fallback) => {
              const modelNames = (fallback.Results || [])
                .map((m: VehicleModel) => m.Model_Name)
                .sort((a: string, b: string) => a.localeCompare(b));
              setModels(modelNames.length > 0 ? modelNames : ["Unknown"]);
            });
        }
        const modelNames = data.Results.map((m: VehicleModel) => m.Model_Name).sort((a: string, b: string) =>
          a.localeCompare(b)
        );
        setModels(modelNames.length > 0 ? modelNames : ["Unknown"]);
      })
      .catch(() => setModels(["Unknown"]))
      .finally(() => setLoadingModels(false));
  }, [year, make]);

  // Trims for classic cars
  useEffect(() => {
    if (!model) {
      setTrims([]);
      setTrim("");
      return;
    }
    setTrims(CLASSIC_TRIMS);
    setTrim("");
  }, [model]);

  const isVehicleSelected = !!(year && make && model);

  return {
    years: YEARS,
    year,
    setYear,
    makes,
    make,
    setMake,
    models,
    model,
    setModel,
    trims,
    trim,
    setTrim,
    loadingMakes,
    loadingModels,
    isVehicleSelected,
  };
};
