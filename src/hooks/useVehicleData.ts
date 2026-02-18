import { useState, useEffect } from "react";

interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
}

// All years 1920–1999
const YEARS = Array.from({ length: 80 }, (_, i) => (1999 - i).toString());

// Curated list of real classic car manufacturers with production year ranges
// [name, firstYear, lastYear]
const CLASSIC_MAKES: [string, number, number][] = [
  ["AC", 1908, 1999],
  ["Alfa Romeo", 1910, 1999],
  ["Allard", 1936, 1960],
  ["American Motors (AMC)", 1954, 1988],
  ["Amphicar", 1961, 1967],
  ["Aston Martin", 1913, 1999],
  ["Auburn", 1900, 1937],
  ["Audi", 1909, 1999],
  ["Austin", 1905, 1987],
  ["Austin-Healey", 1952, 1972],
  ["Avanti", 1962, 1999],
  ["Bentley", 1919, 1999],
  ["BMW", 1916, 1999],
  ["Bristol", 1947, 1999],
  ["Bugatti", 1909, 1999],
  ["Buick", 1903, 1999],
  ["Cadillac", 1902, 1999],
  ["Checker", 1921, 1982],
  ["Chevrolet", 1911, 1999],
  ["Chrysler", 1924, 1999],
  ["Citroën", 1919, 1999],
  ["Cord", 1929, 1937],
  ["Corvette", 1953, 1999],
  ["DeSoto", 1928, 1961],
  ["Dodge", 1914, 1999],
  ["Duesenberg", 1913, 1937],
  ["Eagle", 1988, 1998],
  ["Edsel", 1957, 1960],
  ["Ferrari", 1947, 1999],
  ["Fiat", 1899, 1999],
  ["Ford", 1903, 1999],
  ["Franklin", 1902, 1934],
  ["Fraser", 1945, 1951],
  ["GEO", 1989, 1997],
  ["GM", 1908, 1999],
  ["GMC", 1912, 1999],
  ["Graham", 1928, 1941],
  ["Hudson", 1909, 1957],
  ["Hummer", 1992, 1999],
  ["Hupmobile", 1909, 1941],
  ["Imperial", 1955, 1983],
  ["Jaguar", 1935, 1999],
  ["Jensen", 1935, 1976],
  ["Kaiser", 1945, 1955],
  ["Lamborghini", 1963, 1999],
  ["Lancia", 1906, 1999],
  ["Land Rover", 1948, 1999],
  ["LaSalle", 1927, 1940],
  ["Lincoln", 1917, 1999],
  ["Lotus", 1952, 1999],
  ["Maserati", 1914, 1999],
  ["Maybach", 1921, 1940],
  ["Mazda", 1920, 1999],
  ["McLaren", 1963, 1999],
  ["Mercedes-Benz", 1926, 1999],
  ["Mercury", 1938, 1999],
  ["MG", 1924, 1999],
  ["Mitsubishi", 1970, 1999],
  ["Morgan", 1910, 1999],
  ["Nash", 1917, 1957],
  ["Nissan", 1933, 1999],
  ["Oldsmobile", 1897, 1999],
  ["Packard", 1899, 1958],
  ["Pantera", 1970, 1992],
  ["Peugeot", 1889, 1999],
  ["Pierce-Arrow", 1901, 1938],
  ["Plymouth", 1928, 1999],
  ["Pontiac", 1926, 1999],
  ["Porsche", 1948, 1999],
  ["RAM", 1981, 1999],
  ["Rambler", 1902, 1969],
  ["Renault", 1898, 1999],
  ["Rolls-Royce", 1904, 1999],
  ["Rover", 1904, 1999],
  ["Saab", 1945, 1999],
  ["Saturn", 1990, 1999],
  ["Shelby", 1962, 1999],
  ["Studebaker", 1902, 1966],
  ["Stutz", 1911, 1935],
  ["Subaru", 1958, 1999],
  ["Sunbeam", 1899, 1976],
  ["Suzuki", 1909, 1999],
  ["Toyota", 1937, 1999],
  ["Triumph", 1885, 1984],
  ["Tucker", 1948, 1948],
  ["Volkswagen", 1937, 1999],
  ["Volvo", 1927, 1999],
  ["Willys", 1908, 1963],
  ["Yugo", 1980, 1992],
];

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

  // Filter curated makes by year
  useEffect(() => {
    if (!year) {
      setMakes([]);
      setMake("");
      setModel("");
      setTrim("");
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
    setTrim("");
  }, [year]);

  // Fetch models from NHTSA when make changes
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
        if (!data.Results || data.Results.length === 0) {
          // Fall back to all models for this make
          return fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(make)}?format=json`
          )
            .then((r) => r.json())
            .then((fallback) => {
              const names = (fallback.Results || [])
                .map((m: VehicleModel) => m.Model_Name)
                .filter((n: string) => n && n.length < 40) // filter out garbage
                .sort((a: string, b: string) => a.localeCompare(b));
              setModels(names.length > 0 ? names : ["Unknown"]);
            });
        }
        const names = data.Results
          .map((m: VehicleModel) => m.Model_Name)
          .filter((n: string) => n && n.length < 40)
          .sort((a: string, b: string) => a.localeCompare(b));
        setModels(names.length > 0 ? names : ["Unknown"]);
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
