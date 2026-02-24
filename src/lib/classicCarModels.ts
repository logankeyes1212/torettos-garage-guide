/**
 * Curated classic car model lists for makes/years where the NHTSA API
 * returns no data (mostly pre-1981 vehicles).
 *
 * Format: { "Make": { yearStart-yearEnd: ["Model1", "Model2", ...] } }
 * Overlapping ranges are merged at lookup time.
 */

interface YearRange {
  start: number;
  end: number;
  models: string[];
}

const CLASSIC_MODELS: Record<string, YearRange[]> = {
  "Chevrolet": [
    { start: 1920, end: 1954, models: ["Bel Air", "Deluxe", "Fleetline", "Fleetmaster", "Master", "Special Deluxe", "Styleline", "Stylemaster", "Suburban", "Truck"] },
    { start: 1955, end: 1957, models: ["Bel Air", "150", "210", "Corvette", "Nomad", "Truck"] },
    { start: 1958, end: 1964, models: ["Bel Air", "Biscayne", "Corvair", "Corvette", "Impala", "Nova", "Truck", "Suburban"] },
    { start: 1964, end: 1969, models: ["Camaro", "Chevelle", "Corvair", "Corvette", "El Camino", "Impala", "Malibu", "Nova", "Caprice", "Truck", "Suburban", "Blazer"] },
    { start: 1970, end: 1981, models: ["Camaro", "Caprice", "Chevelle", "Corvette", "El Camino", "Impala", "Laguna", "Malibu", "Monte Carlo", "Nova", "Vega", "Monza", "Blazer", "Truck", "Suburban", "LUV"] },
  ],
  "Ford": [
    { start: 1920, end: 1948, models: ["Model A", "Model T", "Deluxe", "Super Deluxe", "Coupe", "Tudor", "Fordor", "Pickup"] },
    { start: 1949, end: 1959, models: ["Custom", "Crestline", "Fairlane", "Galaxie", "Skyliner", "Thunderbird", "Victoria", "F-100", "F-250", "Ranchero", "Edsel"] },
    { start: 1960, end: 1969, models: ["Falcon", "Fairlane", "Galaxie", "Mustang", "Thunderbird", "Torino", "Bronco", "F-100", "F-250", "Ranchero", "Econoline"] },
    { start: 1970, end: 1981, models: ["Bronco", "Cortina", "Econoline", "Elite", "F-100", "F-150", "F-250", "Fairmont", "Galaxie", "Granada", "LTD", "Maverick", "Mustang", "Pinto", "Ranchero", "Thunderbird", "Torino"] },
  ],
  "Dodge": [
    { start: 1920, end: 1959, models: ["Coronet", "Custom Royal", "Meadowbrook", "Royal", "Sierra", "Wayfarer", "Truck"] },
    { start: 1960, end: 1969, models: ["Challenger", "Charger", "Coronet", "Dart", "Monaco", "Polara", "Super Bee", "Power Wagon", "D100", "A100"] },
    { start: 1970, end: 1981, models: ["Challenger", "Charger", "Colt", "Coronet", "Dart", "Demon", "Diplomat", "Monaco", "Omni", "Ramcharger", "Power Wagon", "D100", "D150", "D200"] },
  ],
  "Plymouth": [
    { start: 1928, end: 1959, models: ["Belvedere", "Cambridge", "Cranbrook", "Deluxe", "Fury", "Plaza", "Savoy", "Suburban"] },
    { start: 1960, end: 1969, models: ["Barracuda", "Belvedere", "Fury", "GTX", "Road Runner", "Satellite", "Valiant"] },
    { start: 1970, end: 1981, models: ["Barracuda", "Cricket", "Duster", "Fury", "Gran Fury", "GTX", "Horizon", "Road Runner", "Satellite", "Scamp", "Trail Duster", "Valiant", "Volare"] },
  ],
  "Pontiac": [
    { start: 1926, end: 1959, models: ["Bonneville", "Catalina", "Chieftain", "Star Chief", "Streamliner", "Super Chief"] },
    { start: 1960, end: 1969, models: ["Bonneville", "Catalina", "Firebird", "Grand Prix", "GTO", "LeMans", "Tempest"] },
    { start: 1970, end: 1981, models: ["Bonneville", "Catalina", "Firebird", "Grand Am", "Grand Prix", "Grand Ville", "GTO", "LeMans", "Phoenix", "Sunbird", "Trans Am", "Ventura"] },
  ],
  "Buick": [
    { start: 1903, end: 1959, models: ["Century", "Electra", "Invicta", "LeSabre", "Limited", "Roadmaster", "Special", "Super", "Skylark"] },
    { start: 1960, end: 1969, models: ["Century", "Electra", "GS", "LeSabre", "Riviera", "Skylark", "Special", "Wildcat"] },
    { start: 1970, end: 1981, models: ["Apollo", "Century", "Electra", "Estate Wagon", "GS", "LeSabre", "Regal", "Riviera", "Skyhawk", "Skylark"] },
  ],
  "Oldsmobile": [
    { start: 1897, end: 1959, models: ["88", "98", "Dynamic", "Fiesta", "Golden Rocket", "Starfire", "Super 88"] },
    { start: 1960, end: 1969, models: ["442", "88", "98", "Cutlass", "Delta 88", "F-85", "Jetstar", "Starfire", "Toronado", "Vista Cruiser"] },
    { start: 1970, end: 1981, models: ["442", "Cutlass", "Cutlass Supreme", "Delta 88", "Omega", "Starfire", "Toronado", "Vista Cruiser", "98"] },
  ],
  "Cadillac": [
    { start: 1902, end: 1959, models: ["Coupe DeVille", "DeVille", "Eldorado", "Fleetwood", "Series 60", "Series 62", "Series 75"] },
    { start: 1960, end: 1969, models: ["Calais", "Coupe DeVille", "DeVille", "Eldorado", "Fleetwood", "Sedan DeVille"] },
    { start: 1970, end: 1981, models: ["Calais", "Coupe DeVille", "DeVille", "Eldorado", "Fleetwood", "Seville", "Sedan DeVille"] },
  ],
  "Chrysler": [
    { start: 1924, end: 1959, models: ["300", "Imperial", "New Yorker", "Newport", "Saratoga", "Town & Country", "Windsor"] },
    { start: 1960, end: 1969, models: ["300", "Imperial", "New Yorker", "Newport", "Town & Country"] },
    { start: 1970, end: 1981, models: ["300", "Cordoba", "Imperial", "LeBaron", "New Yorker", "Newport", "Town & Country"] },
  ],
  "Lincoln": [
    { start: 1917, end: 1959, models: ["Capri", "Continental", "Cosmopolitan", "Mark II", "Premiere", "Zephyr"] },
    { start: 1960, end: 1969, models: ["Continental", "Mark III"] },
    { start: 1970, end: 1981, models: ["Continental", "Mark III", "Mark IV", "Mark V", "Mark VI", "Town Car", "Versailles"] },
  ],
  "Mercury": [
    { start: 1938, end: 1959, models: ["Colony Park", "Custom", "Monterey", "Montclair", "Park Lane", "Turnpike Cruiser"] },
    { start: 1960, end: 1969, models: ["Comet", "Cougar", "Cyclone", "Marauder", "Meteor", "Montego", "Monterey", "Park Lane"] },
    { start: 1970, end: 1981, models: ["Bobcat", "Capri", "Comet", "Cougar", "Grand Marquis", "Marquis", "Monarch", "Montego", "Zephyr"] },
  ],
  "AMC": [
    { start: 1958, end: 1969, models: ["Ambassador", "American", "Classic", "Javelin", "AMX", "Marlin", "Rebel", "Rambler", "SC/Rambler"] },
    { start: 1970, end: 1981, models: ["Ambassador", "AMX", "Concord", "Eagle", "Gremlin", "Hornet", "Javelin", "Matador", "Pacer", "Spirit"] },
  ],
  "American Motors (AMC)": [
    { start: 1954, end: 1969, models: ["Ambassador", "American", "Classic", "Javelin", "AMX", "Marlin", "Rebel", "Rambler", "SC/Rambler"] },
    { start: 1970, end: 1988, models: ["Ambassador", "AMX", "Concord", "Eagle", "Gremlin", "Hornet", "Javelin", "Matador", "Pacer", "Spirit"] },
  ],
  "Jaguar": [
    { start: 1935, end: 1968, models: ["E-Type", "Mark I", "Mark II", "Mark V", "Mark VII", "Mark VIII", "Mark IX", "Mark X", "S-Type", "XJ", "XK120", "XK140", "XK150", "XKE"] },
    { start: 1969, end: 1981, models: ["E-Type", "XJ6", "XJ12", "XJS", "XJ-S"] },
  ],
  "MG": [
    { start: 1924, end: 1981, models: ["MGA", "MGB", "MGB GT", "MGC", "Midget", "TC", "TD", "TF", "Magnette"] },
  ],
  "Triumph": [
    { start: 1946, end: 1981, models: ["GT6", "Herald", "Spitfire", "Stag", "TR2", "TR3", "TR4", "TR5", "TR6", "TR7", "TR8"] },
  ],
  "Austin-Healey": [
    { start: 1952, end: 1972, models: ["100", "100-6", "3000", "Sprite"] },
  ],
  "Porsche": [
    { start: 1948, end: 1969, models: ["356", "356A", "356B", "356C", "911", "912", "914"] },
    { start: 1970, end: 1981, models: ["911", "911 Turbo", "912", "914", "924", "928", "944"] },
  ],
  "Volkswagen": [
    { start: 1937, end: 1969, models: ["Beetle", "Bus", "Karmann Ghia", "Squareback", "Fastback", "Thing", "Type 2", "Type 3"] },
    { start: 1970, end: 1981, models: ["Beetle", "Bus", "Dasher", "Golf", "Jetta", "Karmann Ghia", "Rabbit", "Scirocco", "Super Beetle", "Thing", "Type 2", "Vanagon"] },
  ],
  "BMW": [
    { start: 1955, end: 1969, models: ["1600", "1800", "2000", "2002", "Isetta", "New Class"] },
    { start: 1970, end: 1981, models: ["2002", "3 Series", "320i", "316", "318i", "320", "5 Series", "520", "528i", "530i", "6 Series", "630CSi", "633CSi", "635CSi", "7 Series", "733i"] },
  ],
  "Mercedes-Benz": [
    { start: 1926, end: 1969, models: ["170", "190SL", "220", "230SL", "250", "250SL", "280SE", "280SL", "300", "300SL", "600"] },
    { start: 1970, end: 1981, models: ["220", "230", "240D", "250", "280", "280SE", "300D", "300SD", "350SL", "380SL", "380SLC", "450SE", "450SEL", "450SL", "450SLC", "500SEL", "600"] },
  ],
  "Ferrari": [
    { start: 1947, end: 1969, models: ["166", "195", "212", "225", "250 GT", "250 GTE", "250 GTO", "275 GTB", "330", "365", "Dino 206"] },
    { start: 1970, end: 1981, models: ["246 Dino", "308 GTB", "308 GTS", "308 GT4", "365 Daytona", "365 GT4", "400", "512 BB", "Mondial"] },
  ],
  "Lamborghini": [
    { start: 1963, end: 1981, models: ["350 GT", "400 GT", "Countach", "Espada", "Islero", "Jarama", "Miura", "Silhouette", "Urraco"] },
  ],
  "Aston Martin": [
    { start: 1913, end: 1969, models: ["DB2", "DB4", "DB5", "DB6", "DBS"] },
    { start: 1970, end: 1981, models: ["DBS", "V8", "Vantage", "Lagonda", "Bulldog"] },
  ],
  "Shelby": [
    { start: 1962, end: 1970, models: ["Cobra", "GT350", "GT500", "GT500KR"] },
  ],
  "Toyota": [
    { start: 1958, end: 1969, models: ["Corona", "Corolla", "Crown", "Land Cruiser", "2000GT"] },
    { start: 1970, end: 1981, models: ["Camry", "Celica", "Corolla", "Corona", "Cressida", "Crown", "FJ40", "Hilux", "Land Cruiser", "MR2", "Pickup", "Starlet", "Supra", "Tercel"] },
  ],
  "Honda": [
    { start: 1963, end: 1969, models: ["N360", "N600", "S600", "S800", "T360"] },
    { start: 1970, end: 1981, models: ["Accord", "Civic", "CVCC", "N600", "Prelude", "Z600"] },
  ],
  "Nissan": [
    { start: 1933, end: 1969, models: ["Bluebird", "Cedric", "Fairlady", "Patrol", "Skyline"] },
    { start: 1970, end: 1981, models: ["240Z", "260Z", "280Z", "280ZX", "310", "510", "610", "710", "810", "B210", "Bluebird", "Maxima", "Patrol", "Pickup", "Sentra", "Skyline", "Stanza"] },
  ],
  "Mazda": [
    { start: 1960, end: 1969, models: ["Cosmo", "R100", "1200", "1500"] },
    { start: 1970, end: 1981, models: ["616", "626", "808", "929", "B-Series", "Cosmo", "GLC", "R100", "RX-2", "RX-3", "RX-4", "RX-7"] },
  ],
  "Volvo": [
    { start: 1927, end: 1969, models: ["122S", "164", "1800", "Amazon", "PV444", "PV544", "P1800"] },
    { start: 1970, end: 1981, models: ["142", "144", "145", "164", "1800ES", "240", "242", "244", "245", "262C", "264", "265"] },
  ],
  "Rolls-Royce": [
    { start: 1904, end: 1969, models: ["Corniche", "Phantom", "Silver Cloud", "Silver Dawn", "Silver Shadow", "Silver Spirit", "Silver Wraith"] },
    { start: 1970, end: 1981, models: ["Camargue", "Corniche", "Phantom VI", "Silver Shadow", "Silver Shadow II", "Silver Spirit", "Silver Wraith II"] },
  ],
  "Bentley": [
    { start: 1919, end: 1969, models: ["Continental", "Mark VI", "R-Type", "S1", "S2", "S3", "T-Series"] },
    { start: 1970, end: 1981, models: ["Corniche", "Mulsanne", "T-Series", "T2"] },
  ],
  "Studebaker": [
    { start: 1902, end: 1966, models: ["Avanti", "Champion", "Commander", "Daytona", "Gran Turismo Hawk", "Hawk", "Lark", "President", "Scotsman", "Silver Hawk", "Starlight", "Starliner"] },
  ],
  "Hudson": [
    { start: 1909, end: 1957, models: ["Commodore", "Hornet", "Italia", "Jet", "Pacemaker", "Super Six", "Wasp"] },
  ],
  "Nash": [
    { start: 1917, end: 1957, models: ["Ambassador", "Metropolitan", "Rambler", "Statesman"] },
  ],
  "Packard": [
    { start: 1899, end: 1958, models: ["Caribbean", "Cavalier", "Clipper", "Custom Eight", "Hawk", "Patrician", "Super Eight"] },
  ],
  "DeSoto": [
    { start: 1928, end: 1961, models: ["Adventurer", "Custom", "Deluxe", "Firedome", "Fireflite", "Powermaster"] },
  ],
  "Willys": [
    { start: 1908, end: 1963, models: ["Aero", "CJ-2A", "CJ-3A", "CJ-3B", "CJ-5", "Jeep", "Jeepster", "Station Wagon", "Truck"] },
  ],
  "Jeep": [
    { start: 1941, end: 1969, models: ["CJ-2A", "CJ-3A", "CJ-3B", "CJ-5", "CJ-6", "Commando", "Gladiator", "Grand Wagoneer", "J-Series", "Wagoneer"] },
    { start: 1970, end: 1981, models: ["Cherokee", "CJ-5", "CJ-7", "Commando", "Grand Wagoneer", "J-10", "J-20", "Wagoneer"] },
  ],
  "Land Rover": [
    { start: 1948, end: 1981, models: ["Defender", "Range Rover", "Series I", "Series II", "Series IIA", "Series III"] },
  ],
  "Fiat": [
    { start: 1899, end: 1981, models: ["124", "124 Spider", "128", "131", "1500", "500", "600", "850", "Brava", "Spider", "Strada", "X1/9"] },
  ],
  "Alfa Romeo": [
    { start: 1910, end: 1969, models: ["1300", "1600", "1750", "2000", "2600", "Duetto", "Giulia", "Giulietta", "GTV", "Montreal", "Spider"] },
    { start: 1970, end: 1981, models: ["1750", "2000", "Alfetta", "GTV", "Milano", "Montreal", "Spider", "Sprint"] },
  ],
  "Lotus": [
    { start: 1952, end: 1981, models: ["Elan", "Eclat", "Elite", "Esprit", "Europa", "Seven", "Super Seven"] },
  ],
  "Maserati": [
    { start: 1914, end: 1981, models: ["Bora", "Ghibli", "Indy", "Khamsin", "Merak", "Mexico", "Mistral", "Quattroporte", "Sebring"] },
  ],
  "Datsun": [
    { start: 1931, end: 1981, models: ["1200", "1600", "210", "240Z", "260Z", "280Z", "280ZX", "310", "510", "521", "610", "620", "710", "810", "B210", "Bluebird", "Fairlady", "Pickup", "Roadster"] },
  ],
  "Subaru": [
    { start: 1958, end: 1981, models: ["360", "Brat", "DL", "FE", "FF-1", "GL", "Leone", "Sambar", "Star"] },
  ],
  "Saab": [
    { start: 1949, end: 1981, models: ["92", "93", "95", "96", "99", "900", "Sonett"] },
  ],
  "Peugeot": [
    { start: 1889, end: 1981, models: ["203", "304", "403", "404", "504", "505", "604"] },
  ],
  "Renault": [
    { start: 1898, end: 1981, models: ["4CV", "5", "8", "10", "12", "15", "16", "17", "18", "Caravelle", "Dauphine", "Fuego", "Le Car", "R5"] },
  ],
  "Citroën": [
    { start: 1919, end: 1981, models: ["2CV", "CX", "DS", "GS", "ID", "Mehari", "SM", "Traction Avant"] },
  ],
  "Checker": [
    { start: 1921, end: 1982, models: ["A11", "Marathon", "Superba", "Taxi"] },
  ],
  "Tucker": [
    { start: 1948, end: 1948, models: ["48"] },
  ],
  "Avanti": [
    { start: 1962, end: 1999, models: ["Avanti", "Avanti II"] },
  ],
  "Imperial": [
    { start: 1955, end: 1983, models: ["Crown", "LeBaron", "Southampton"] },
  ],
  "GMC": [
    { start: 1912, end: 1981, models: ["C/K 1500", "C/K 2500", "C/K 3500", "Caballero", "Jimmy", "Sprint", "Suburban", "Vandura"] },
  ],
  "RAM": [
    { start: 1981, end: 1993, models: ["D100", "D150", "D250", "D350", "W150", "W250", "Ramcharger", "Power Wagon"] },
  ],
  "Hummer": [
    { start: 1992, end: 2010, models: ["H1", "H2", "H3", "H3T"] },
  ],
};

/**
 * Look up curated model names for a given year and make.
 * Returns undefined if no curated data exists (so caller can try API).
 */
export function getClassicModels(year: number, make: string): string[] | undefined {
  const ranges = CLASSIC_MODELS[make];
  if (!ranges) return undefined;

  const models = new Set<string>();
  for (const range of ranges) {
    if (year >= range.start && year <= range.end) {
      range.models.forEach((m) => models.add(m));
    }
  }

  if (models.size === 0) return undefined;
  return Array.from(models).sort((a, b) => a.localeCompare(b));
}
