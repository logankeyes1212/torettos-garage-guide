import { useState, useEffect } from "react";
import { getModelEngines } from "@/lib/engineData";
import { getClassicModels } from "@/lib/classicCarModels";

interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
}

// All years 1920–2027
const YEARS = Array.from({ length: 108 }, (_, i) => (2027 - i).toString());

// Curated list of car manufacturers with production year ranges
const CLASSIC_MAKES: [string, number, number][] = [
  ["AC", 1908, 1999],
  ["Alfa Romeo", 1910, 2027],
  ["Allard", 1936, 1960],
  ["American Motors (AMC)", 1954, 1988],
  ["Amphicar", 1961, 1967],
  ["Aston Martin", 1913, 2027],
  ["Auburn", 1900, 1937],
  ["Audi", 1909, 2027],
  ["Austin", 1905, 1987],
  ["Austin-Healey", 1952, 1972],
  ["Avanti", 1962, 1999],
  ["Bentley", 1919, 2027],
  ["BMW", 1916, 2027],
  ["Bristol", 1947, 2011],
  ["Bugatti", 1909, 2027],
  ["Buick", 1903, 2027],
  ["Cadillac", 1902, 2027],
  ["Checker", 1921, 1982],
  ["Chevrolet", 1911, 2027],
  ["Chrysler", 1924, 2027],
  ["Citroën", 1919, 2027],
  ["Cord", 1929, 1937],
  
  ["DeSoto", 1928, 1961],
  ["Dodge", 1914, 2027],
  ["Duesenberg", 1913, 1937],
  ["Eagle", 1988, 1998],
  ["Edsel", 1957, 1960],
  ["Ferrari", 1947, 2027],
  ["Fiat", 1899, 2027],
  ["Ford", 1903, 2027],
  ["Franklin", 1902, 1934],
  ["Fraser", 1945, 1951],
  ["GEO", 1989, 1997],
  
  ["GMC", 1912, 2027],
  ["Graham", 1928, 1941],
  ["Hudson", 1909, 1957],
  ["Hummer", 1992, 2010],
  ["Hupmobile", 1909, 1941],
  ["Imperial", 1955, 1983],
  ["Jaguar", 1935, 2027],
  ["Jensen", 1935, 1976],
  ["Kaiser", 1945, 1955],
  ["Lamborghini", 1963, 2027],
  ["Lancia", 1906, 2027],
  ["Land Rover", 1948, 2027],
  ["LaSalle", 1927, 1940],
  ["Lincoln", 1917, 2027],
  ["Lotus", 1952, 2027],
  ["Maserati", 1914, 2027],
  ["Maybach", 1921, 2027],
  ["Mazda", 1920, 2027],
  ["McLaren", 1963, 2027],
  ["Mercedes-Benz", 1926, 2027],
  ["Mercury", 1938, 2011],
  ["MG", 1924, 2011],
  ["Mitsubishi", 1970, 2027],
  ["Morgan", 1910, 2027],
  ["Nash", 1917, 1957],
  ["Nissan", 1933, 2027],
  ["Oldsmobile", 1897, 2004],
  ["Packard", 1899, 1958],
  ["De Tomaso", 1959, 2004],
  ["Peugeot", 1889, 2027],
  ["Pierce-Arrow", 1901, 1938],
  ["Plymouth", 1928, 2001],
  ["Pontiac", 1926, 2010],
  ["Porsche", 1948, 2027],
  ["RAM", 1981, 2027],
  ["Rambler", 1902, 1969],
  ["Renault", 1898, 2027],
  ["Rolls-Royce", 1904, 2027],
  ["Rover", 1904, 2005],
  ["Saab", 1945, 2012],
  ["Saturn", 1990, 2010],
  ["Shelby", 1962, 2027],
  ["Studebaker", 1902, 1966],
  ["Stutz", 1911, 1935],
  ["Subaru", 1958, 2027],
  ["Sunbeam", 1899, 1976],
  ["Suzuki", 1909, 2027],
  ["Toyota", 1937, 2027],
  ["Triumph", 1885, 1984],
  ["Tucker", 1948, 1948],
  ["Volkswagen", 1937, 2027],
  ["Volvo", 1927, 2027],
  ["Willys", 1908, 1963],
  ["Yugo", 1980, 1992],
  ["Acura", 1986, 2027],
  ["Genesis", 2015, 2027],
  ["Honda", 1948, 2027],
  ["Hyundai", 1967, 2027],
  ["Infiniti", 1989, 2027],
  ["Jeep", 1941, 2027],
  ["Kia", 1944, 2027],
  ["Lexus", 1989, 2027],
  ["MINI", 1959, 2027],
  ["Polestar", 2017, 2027],
  ["Ram Trucks", 2010, 2027],
  ["Rivian", 2021, 2027],
  ["Scion", 2003, 2016],
  ["Tesla", 2008, 2027],
];

export const useVehicleData = () => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");

  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [engines, setEngines] = useState<string[]>([]);

  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingEngines, setLoadingEngines] = useState(false);

  // Filter curated makes by year
  useEffect(() => {
    if (!year) {
      setMakes([]);
      setMake("");
      setModel("");
      setEngine("");
      return;
    }
    const yearNum = parseInt(year);
    const filtered = CLASSIC_MAKES
      .filter(([, start, end]) => yearNum >= start && yearNum <= end)
      .map(([name]) => name)
      .sort((a, b) => a.localeCompare(b));
    setMakes(filtered);
    setMake("");
    setModel("");
    setEngine("");
  }, [year]);

  // Fetch models from NHTSA — only models produced that specific year
  useEffect(() => {
    if (!year || !make) {
      setModels([]);
      setModel("");
      setEngine("");
      return;
    }
    setLoadingModels(true);
    setModel("");
    setEngine("");

    const yearNum = parseInt(year);

    // Try NHTSA API first
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const names = (data.Results || [])
          .map((m: VehicleModel) => m.Model_Name)
          .filter((n: string) => n && n.length < 40)
          .sort((a: string, b: string) => a.localeCompare(b));
        const unique = [...new Set(names)] as string[];

        if (unique.length > 0) {
          setModels(unique);
        } else {
          // Fallback to curated classic models
          const classic = getClassicModels(yearNum, make);
          if (classic && classic.length > 0) {
            setModels([...classic, "Other / Custom"]);
          } else {
            setModels(["Other / Custom"]);
          }
        }
      })
      .catch(() => {
        const classic = getClassicModels(yearNum, make);
        if (classic && classic.length > 0) {
          setModels([...classic, "Other / Custom"]);
        } else {
          setModels(["Other / Custom"]);
        }
      })
      .finally(() => setLoadingModels(false));
  }, [year, make]);

  // Determine engine options based on make/year/model
  useEffect(() => {
    if (!year || !make || !model) {
      setEngines([]);
      setEngine("");
      return;
    }
    setEngine("");
    const y = parseInt(year);

    // Try model-specific lookup first
    const specificEngines = getModelEngines(y, make, model);
    if (specificEngines) {
      specificEngines.push("Other / Not Listed");
      setEngines(specificEngines);
      return;
    }

    // EV-only makes
    const ev = ["Tesla", "Rivian", "Polestar"];
    if (ev.includes(make)) {
      setEngines(["Electric"]);
      return;
    }

    // No specific match — show only a safe default
    setEngines(["Unknown / Not Listed"]);
  }, [year, make, model]);

  const isVehicleSelected = !!(year && make && model);

  return {
    years: YEARS,
    year, setYear,
    makes, make, setMake,
    models, model, setModel,
    engines, engine, setEngine,
    loadingMakes, loadingModels, loadingEngines,
    isVehicleSelected,
  };
};
