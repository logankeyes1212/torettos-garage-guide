/**
 * Model-specific engine options database.
 * Key format: "make|model" (case-insensitive lookup).
 * Value: array of [yearStart, yearEnd, engines[]] tuples.
 * Falls back to category-based logic in useVehicleData if no match found.
 */

type EngineEntry = [number, number, string[]];

const ENGINE_DB: Record<string, EngineEntry[]> = {
  // === ACURA ===
  "acura|integra": [
    [1986, 1989, ["1.6L Inline 4-Cylinder"]],
    [1990, 1993, ["1.7L Inline 4-Cylinder", "1.8L Inline 4-Cylinder"]],
    [1994, 2001, ["1.8L Inline 4-Cylinder", "1.8L DOHC VTEC Inline 4-Cylinder"]],
    [2023, 2027, ["1.5L Turbo Inline 4-Cylinder"]],
  ],
  "acura|rsx": [
    [2002, 2006, ["2.0L Inline 4-Cylinder", "2.0L DOHC VTEC Inline 4-Cylinder"]],
  ],
  "acura|nsx": [
    [1991, 2005, ["3.0L V6 VTEC", "3.2L V6 VTEC"]],
    [2017, 2022, ["3.5L Twin-Turbo V6 Hybrid"]],
  ],
  "acura|tl": [
    [1996, 1998, ["2.5L Inline 5-Cylinder"]],
    [1999, 2003, ["3.2L V6"]],
    [2004, 2008, ["3.2L V6", "3.5L V6"]],
    [2009, 2014, ["3.5L V6", "3.7L V6"]],
  ],
  "acura|tlx": [
    [2015, 2020, ["2.4L Inline 4-Cylinder", "3.5L V6"]],
    [2021, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo V6"]],
  ],
  "acura|mdx": [
    [2001, 2006, ["3.5L V6"]],
    [2007, 2013, ["3.7L V6"]],
    [2014, 2020, ["3.5L V6"]],
    [2022, 2027, ["3.5L V6", "3.0L Turbo V6", "3.5L V6 Hybrid"]],
  ],
  "acura|rdx": [
    [2007, 2012, ["2.3L Turbo Inline 4-Cylinder"]],
    [2013, 2018, ["3.5L V6"]],
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "acura|adx": [
    [2025, 2027, ["1.5L Turbo Inline 4-Cylinder"]],
  ],

  // === LEXUS ===
  "lexus|ct 200h": [
    [2011, 2022, ["1.8L Inline 4-Cylinder Hybrid"]],
  ],
  "lexus|ct200h": [
    [2011, 2022, ["1.8L Inline 4-Cylinder Hybrid"]],
  ],
  "lexus|is 300": [
    [2001, 2005, ["3.0L Inline 6-Cylinder"]],
    [2016, 2027, ["3.5L V6"]],
  ],
  "lexus|is 250": [
    [2006, 2015, ["2.5L V6"]],
  ],
  "lexus|is 350": [
    [2006, 2027, ["3.5L V6"]],
  ],
  "lexus|is 500": [
    [2022, 2027, ["5.0L V8"]],
  ],
  "lexus|gs 350": [
    [2007, 2020, ["3.5L V6"]],
  ],
  "lexus|es 350": [
    [2007, 2027, ["3.5L V6"]],
  ],
  "lexus|es 300h": [
    [2013, 2027, ["2.5L Inline 4-Cylinder Hybrid"]],
  ],
  "lexus|rx 350": [
    [2007, 2027, ["3.5L V6"]],
  ],
  "lexus|rx 450h": [
    [2010, 2027, ["3.5L V6 Hybrid"]],
  ],
  "lexus|lc 500": [
    [2018, 2027, ["5.0L V8"]],
  ],
  "lexus|lc 500h": [
    [2018, 2027, ["3.5L V6 Hybrid"]],
  ],
  "lexus|lfa": [
    [2012, 2012, ["4.8L V10"]],
  ],
  "lexus|ls 400": [
    [1990, 2000, ["4.0L V8"]],
  ],
  "lexus|ls 430": [
    [2001, 2006, ["4.3L V8"]],
  ],
  "lexus|sc 300": [
    [1992, 2000, ["3.0L Inline 6-Cylinder"]],
  ],
  "lexus|sc 400": [
    [1992, 2000, ["4.0L V8"]],
  ],

  // === HONDA ===
  "honda|civic": [
    [1973, 1983, ["1.2L Inline 4-Cylinder", "1.5L Inline 4-Cylinder"]],
    [1984, 1987, ["1.3L Inline 4-Cylinder", "1.5L Inline 4-Cylinder"]],
    [1988, 1991, ["1.5L Inline 4-Cylinder", "1.6L Inline 4-Cylinder"]],
    [1992, 1995, ["1.5L Inline 4-Cylinder", "1.6L VTEC Inline 4-Cylinder"]],
    [1996, 2000, ["1.6L Inline 4-Cylinder", "1.6L VTEC Inline 4-Cylinder"]],
    [2001, 2005, ["1.7L Inline 4-Cylinder"]],
    [2006, 2011, ["1.8L Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
    [2012, 2015, ["1.8L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2016, 2021, ["1.5L Turbo Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
    [2022, 2027, ["1.5L Turbo Inline 4-Cylinder", "2.0L Inline 4-Cylinder", "2.0L Hybrid"]],
  ],
  "honda|accord": [
    [1976, 1981, ["1.6L Inline 4-Cylinder", "1.8L Inline 4-Cylinder"]],
    [1982, 1985, ["1.8L Inline 4-Cylinder"]],
    [1986, 1989, ["2.0L Inline 4-Cylinder"]],
    [1990, 1993, ["2.2L Inline 4-Cylinder"]],
    [1994, 1997, ["2.2L Inline 4-Cylinder", "2.7L V6"]],
    [1998, 2002, ["2.3L Inline 4-Cylinder", "3.0L V6"]],
    [2003, 2007, ["2.4L Inline 4-Cylinder", "3.0L V6"]],
    [2008, 2012, ["2.4L Inline 4-Cylinder", "3.5L V6"]],
    [2013, 2017, ["2.4L Inline 4-Cylinder", "3.5L V6"]],
    [2018, 2027, ["1.5L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.0L Hybrid"]],
  ],
  "honda|cr-v": [
    [1997, 2001, ["2.0L Inline 4-Cylinder"]],
    [2002, 2006, ["2.4L Inline 4-Cylinder"]],
    [2007, 2011, ["2.4L Inline 4-Cylinder"]],
    [2012, 2016, ["2.4L Inline 4-Cylinder"]],
    [2017, 2024, ["1.5L Turbo Inline 4-Cylinder", "2.0L Hybrid"]],
    [2025, 2027, ["1.5L Turbo Inline 4-Cylinder", "2.0L Hybrid"]],
  ],
  "honda|s2000": [
    [2000, 2003, ["2.0L DOHC VTEC Inline 4-Cylinder"]],
    [2004, 2009, ["2.2L DOHC VTEC Inline 4-Cylinder"]],
  ],
  "honda|prelude": [
    [1979, 1982, ["1.8L Inline 4-Cylinder"]],
    [1983, 1987, ["1.8L Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
    [1988, 1991, ["2.0L Inline 4-Cylinder", "2.1L Inline 4-Cylinder"]],
    [1992, 1996, ["2.2L VTEC Inline 4-Cylinder", "2.3L Inline 4-Cylinder"]],
    [1997, 2001, ["2.2L VTEC Inline 4-Cylinder"]],
  ],

  // === TOYOTA ===
  "toyota|camry": [
    [1983, 1986, ["2.0L Inline 4-Cylinder"]],
    [1987, 1991, ["2.0L Inline 4-Cylinder", "2.5L V6"]],
    [1992, 1996, ["2.2L Inline 4-Cylinder", "3.0L V6"]],
    [1997, 2001, ["2.2L Inline 4-Cylinder", "3.0L V6"]],
    [2002, 2006, ["2.4L Inline 4-Cylinder", "3.0L V6", "3.3L V6"]],
    [2007, 2011, ["2.4L Inline 4-Cylinder", "3.5L V6"]],
    [2012, 2017, ["2.5L Inline 4-Cylinder", "3.5L V6", "2.5L Hybrid"]],
    [2018, 2027, ["2.5L Inline 4-Cylinder", "3.5L V6", "2.5L Hybrid"]],
  ],
  "toyota|corolla": [
    [1966, 1970, ["1.1L Inline 4-Cylinder"]],
    [1971, 1974, ["1.2L Inline 4-Cylinder", "1.6L Inline 4-Cylinder"]],
    [1975, 1979, ["1.2L Inline 4-Cylinder", "1.6L Inline 4-Cylinder"]],
    [1980, 1983, ["1.8L Inline 4-Cylinder"]],
    [1984, 1987, ["1.6L Inline 4-Cylinder"]],
    [1988, 1992, ["1.6L Inline 4-Cylinder"]],
    [1993, 1997, ["1.6L Inline 4-Cylinder", "1.8L Inline 4-Cylinder"]],
    [1998, 2002, ["1.8L Inline 4-Cylinder"]],
    [2003, 2008, ["1.8L Inline 4-Cylinder"]],
    [2009, 2013, ["1.8L Inline 4-Cylinder"]],
    [2014, 2019, ["1.8L Inline 4-Cylinder"]],
    [2020, 2027, ["2.0L Inline 4-Cylinder", "1.8L Hybrid"]],
  ],
  "toyota|supra": [
    [1979, 1981, ["2.6L Inline 6-Cylinder"]],
    [1982, 1986, ["2.8L Inline 6-Cylinder"]],
    [1986, 1992, ["3.0L Inline 6-Cylinder", "3.0L Turbo Inline 6-Cylinder"]],
    [1993, 1998, ["3.0L Inline 6-Cylinder", "3.0L Twin-Turbo Inline 6-Cylinder"]],
    [2020, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder"]],
  ],
  "toyota|tacoma": [
    [1995, 2004, ["2.4L Inline 4-Cylinder", "2.7L Inline 4-Cylinder", "3.4L V6"]],
    [2005, 2015, ["2.7L Inline 4-Cylinder", "4.0L V6"]],
    [2016, 2023, ["2.7L Inline 4-Cylinder", "3.5L V6"]],
    [2024, 2027, ["2.4L Turbo Inline 4-Cylinder", "2.4L Turbo Hybrid"]],
  ],
  "toyota|4runner": [
    [1984, 1989, ["2.4L Inline 4-Cylinder", "3.0L V6"]],
    [1990, 1995, ["2.4L Inline 4-Cylinder", "3.0L V6"]],
    [1996, 2002, ["2.7L Inline 4-Cylinder", "3.4L V6"]],
    [2003, 2009, ["4.0L V6", "4.7L V8"]],
    [2010, 2024, ["4.0L V6"]],
    [2025, 2027, ["2.4L Turbo Inline 4-Cylinder", "2.4L Turbo Hybrid"]],
  ],
  "toyota|prius": [
    [2001, 2003, ["1.5L Inline 4-Cylinder Hybrid"]],
    [2004, 2009, ["1.5L Inline 4-Cylinder Hybrid"]],
    [2010, 2015, ["1.8L Inline 4-Cylinder Hybrid"]],
    [2016, 2022, ["1.8L Inline 4-Cylinder Hybrid"]],
    [2023, 2027, ["2.0L Inline 4-Cylinder Hybrid"]],
  ],
  "toyota|mr2": [
    [1985, 1989, ["1.6L Inline 4-Cylinder"]],
    [1990, 1995, ["2.0L Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [2000, 2005, ["1.8L Inline 4-Cylinder"]],
  ],
  "toyota|land cruiser": [
    [1960, 1980, ["3.9L Inline 6-Cylinder", "4.2L Inline 6-Cylinder"]],
    [1981, 1990, ["4.2L Inline 6-Cylinder"]],
    [1991, 1997, ["4.5L Inline 6-Cylinder"]],
    [1998, 2007, ["4.7L V8"]],
    [2008, 2021, ["5.7L V8"]],
    [2024, 2027, ["2.4L Turbo Hybrid"]],
  ],

  // === NISSAN ===
  "nissan|240sx": [
    [1989, 1998, ["2.4L Inline 4-Cylinder"]],
  ],
  "nissan|300zx": [
    [1984, 1989, ["3.0L V6"]],
    [1990, 1996, ["3.0L V6", "3.0L Twin-Turbo V6"]],
  ],
  "nissan|350z": [
    [2003, 2009, ["3.5L V6"]],
  ],
  "nissan|370z": [
    [2009, 2020, ["3.7L V6"]],
  ],
  "nissan|z": [
    [2023, 2027, ["3.0L Twin-Turbo V6"]],
  ],
  "nissan|skyline gt-r": [
    [1989, 2002, ["2.6L Twin-Turbo Inline 6-Cylinder"]],
  ],
  "nissan|gt-r": [
    [2009, 2024, ["3.8L Twin-Turbo V6"]],
  ],
  "nissan|altima": [
    [1993, 1997, ["2.4L Inline 4-Cylinder"]],
    [1998, 2001, ["2.4L Inline 4-Cylinder"]],
    [2002, 2006, ["2.5L Inline 4-Cylinder", "3.5L V6"]],
    [2007, 2012, ["2.5L Inline 4-Cylinder", "3.5L V6"]],
    [2013, 2018, ["2.5L Inline 4-Cylinder", "3.5L V6"]],
    [2019, 2027, ["2.5L Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
  ],

  // === MAZDA ===
  "mazda|miata": [
    [1990, 1993, ["1.6L Inline 4-Cylinder"]],
    [1994, 1997, ["1.8L Inline 4-Cylinder"]],
    [1999, 2000, ["1.8L Inline 4-Cylinder"]],
    [2001, 2005, ["1.8L Inline 4-Cylinder"]],
    [2006, 2015, ["2.0L Inline 4-Cylinder"]],
    [2016, 2027, ["2.0L Inline 4-Cylinder"]],
  ],
  "mazda|mx-5": [
    [1990, 1997, ["1.6L Inline 4-Cylinder", "1.8L Inline 4-Cylinder"]],
    [1998, 2005, ["1.8L Inline 4-Cylinder"]],
    [2006, 2015, ["2.0L Inline 4-Cylinder"]],
    [2016, 2027, ["2.0L Inline 4-Cylinder"]],
  ],
  "mazda|mx-5 miata": [
    [1990, 1997, ["1.6L Inline 4-Cylinder", "1.8L Inline 4-Cylinder"]],
    [1998, 2005, ["1.8L Inline 4-Cylinder"]],
    [2006, 2015, ["2.0L Inline 4-Cylinder"]],
    [2016, 2027, ["2.0L Inline 4-Cylinder"]],
  ],
  "mazda|rx-7": [
    [1979, 1985, ["1.1L Rotary (12A)"]],
    [1986, 1991, ["1.3L Rotary (13B)"]],
    [1993, 2002, ["1.3L Twin-Turbo Rotary (13B-REW)"]],
  ],
  "mazda|rx-8": [
    [2004, 2011, ["1.3L Rotary (Renesis)"]],
  ],
  "mazda|3": [
    [2004, 2009, ["2.0L Inline 4-Cylinder", "2.3L Inline 4-Cylinder"]],
    [2010, 2013, ["2.0L Inline 4-Cylinder", "2.5L Inline 4-Cylinder"]],
    [2014, 2018, ["2.0L Inline 4-Cylinder", "2.5L Inline 4-Cylinder"]],
    [2019, 2027, ["2.0L Inline 4-Cylinder", "2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder"]],
  ],

  // === FORD ===
  "ford|mustang": [
    [1964, 1966, ["170ci Inline 6-Cylinder", "200ci Inline 6-Cylinder", "260ci V8", "289ci V8"]],
    [1967, 1968, ["200ci Inline 6-Cylinder", "289ci V8", "302ci V8", "390ci V8", "428ci V8"]],
    [1969, 1970, ["250ci Inline 6-Cylinder", "302ci V8", "351ci V8", "428ci V8", "429ci V8"]],
    [1971, 1973, ["250ci Inline 6-Cylinder", "302ci V8", "351ci V8"]],
    [1974, 1978, ["2.3L Inline 4-Cylinder", "2.8L V6", "302ci V8"]],
    [1979, 1986, ["2.3L Inline 4-Cylinder", "2.3L Turbo Inline 4-Cylinder", "3.8L V6", "5.0L V8"]],
    [1987, 1993, ["2.3L Inline 4-Cylinder", "5.0L V8"]],
    [1994, 1998, ["3.8L V6", "4.6L V8", "5.0L V8"]],
    [1999, 2004, ["3.8L V6", "4.6L V8"]],
    [2005, 2010, ["4.0L V6", "4.6L V8", "5.4L Supercharged V8"]],
    [2011, 2014, ["3.7L V6", "5.0L V8", "5.8L Supercharged V8"]],
    [2015, 2023, ["2.3L Turbo Inline 4-Cylinder", "5.0L V8", "5.2L V8"]],
    [2024, 2027, ["2.3L Turbo Inline 4-Cylinder", "5.0L V8"]],
  ],
  "ford|f-150": [
    [1975, 1979, ["300ci Inline 6-Cylinder", "302ci V8", "351ci V8", "460ci V8"]],
    [1980, 1986, ["300ci Inline 6-Cylinder", "302ci V8", "351ci V8"]],
    [1987, 1996, ["4.9L Inline 6-Cylinder", "5.0L V8", "5.8L V8"]],
    [1997, 2003, ["4.2L V6", "4.6L V8", "5.4L V8"]],
    [2004, 2008, ["4.2L V6", "4.6L V8", "5.4L V8"]],
    [2009, 2014, ["3.5L V6", "3.5L Turbo V6", "5.0L V8", "6.2L V8"]],
    [2015, 2020, ["2.7L Turbo V6", "3.3L V6", "3.5L Turbo V6", "5.0L V8"]],
    [2021, 2027, ["2.7L Turbo V6", "3.3L V6", "3.5L Turbo V6", "5.0L V8", "3.5L Hybrid V6"]],
  ],
  "ford|bronco": [
    [1966, 1977, ["170ci Inline 6-Cylinder", "289ci V8", "302ci V8"]],
    [1978, 1979, ["351ci V8", "400ci V8"]],
    [1980, 1986, ["4.9L Inline 6-Cylinder", "5.0L V8", "5.8L V8"]],
    [1987, 1996, ["4.9L Inline 6-Cylinder", "5.0L V8", "5.8L V8"]],
    [2021, 2027, ["2.3L Turbo Inline 4-Cylinder", "2.7L Turbo V6"]],
  ],
  "ford|focus": [
    [2000, 2004, ["2.0L Inline 4-Cylinder"]],
    [2005, 2007, ["2.0L Inline 4-Cylinder", "2.3L Inline 4-Cylinder"]],
    [2008, 2011, ["2.0L Inline 4-Cylinder"]],
    [2012, 2018, ["2.0L Inline 4-Cylinder", "1.0L Turbo Inline 3-Cylinder", "2.3L Turbo Inline 4-Cylinder"]],
  ],

  // === CHEVROLET ===
  "chevrolet|camaro": [
    [1967, 1969, ["230ci Inline 6-Cylinder", "250ci Inline 6-Cylinder", "302ci V8", "327ci V8", "350ci V8", "396ci V8"]],
    [1970, 1973, ["250ci Inline 6-Cylinder", "307ci V8", "350ci V8", "396ci V8"]],
    [1974, 1981, ["250ci Inline 6-Cylinder", "305ci V8", "350ci V8"]],
    [1982, 1992, ["2.5L Inline 4-Cylinder", "2.8L V6", "5.0L V8", "5.7L V8"]],
    [1993, 2002, ["3.4L V6", "3.8L V6", "5.7L V8"]],
    [2010, 2015, ["3.6L V6", "6.2L V8", "7.0L V8"]],
    [2016, 2024, ["2.0L Turbo Inline 4-Cylinder", "3.6L V6", "6.2L V8"]],
  ],
  "chevrolet|corvette": [
    [1953, 1955, ["235ci Inline 6-Cylinder"]],
    [1955, 1962, ["265ci V8", "283ci V8"]],
    [1963, 1967, ["327ci V8", "396ci V8", "427ci V8"]],
    [1968, 1982, ["350ci V8", "454ci V8"]],
    [1984, 1991, ["5.7L V8"]],
    [1992, 1996, ["5.7L V8"]],
    [1997, 2004, ["5.7L V8"]],
    [2005, 2013, ["6.0L V8", "6.2L V8", "7.0L V8"]],
    [2014, 2019, ["6.2L V8"]],
    [2020, 2027, ["6.2L V8", "5.5L Flat-Plane V8"]],
  ],
  "chevrolet|silverado": [
    [1999, 2006, ["4.3L V6", "4.8L V8", "5.3L V8", "6.0L V8"]],
    [2007, 2013, ["4.3L V6", "4.8L V8", "5.3L V8", "6.0L V8", "6.2L V8"]],
    [2014, 2018, ["4.3L V6", "5.3L V8", "6.2L V8"]],
    [2019, 2027, ["2.7L Turbo Inline 4-Cylinder", "4.3L V6", "5.3L V8", "6.2L V8", "3.0L Turbo Diesel"]],
  ],
  "chevrolet|impala": [
    [1958, 1961, ["235ci Inline 6-Cylinder", "283ci V8", "348ci V8"]],
    [1962, 1964, ["230ci Inline 6-Cylinder", "283ci V8", "327ci V8", "409ci V8"]],
    [1965, 1970, ["230ci Inline 6-Cylinder", "283ci V8", "327ci V8", "396ci V8", "427ci V8"]],
    [1971, 1976, ["250ci Inline 6-Cylinder", "350ci V8", "400ci V8", "454ci V8"]],
    [1977, 1985, ["250ci Inline 6-Cylinder", "305ci V8"]],
    [1994, 1996, ["5.7L V8"]],
    [2000, 2005, ["3.4L V6", "3.8L V6"]],
    [2006, 2013, ["3.5L V6", "3.9L V6", "5.3L V8"]],
    [2014, 2020, ["2.5L Inline 4-Cylinder", "3.6L V6"]],
  ],
  "chevrolet|chevelle": [
    [1964, 1967, ["230ci Inline 6-Cylinder", "283ci V8", "327ci V8", "396ci V8"]],
    [1968, 1972, ["250ci Inline 6-Cylinder", "307ci V8", "350ci V8", "396ci V8", "402ci V8", "454ci V8"]],
    [1973, 1977, ["250ci Inline 6-Cylinder", "350ci V8", "454ci V8"]],
  ],

  // === DODGE ===
  "dodge|challenger": [
    [1970, 1974, ["225ci Inline 6-Cylinder", "318ci V8", "340ci V8", "383ci V8", "426ci Hemi V8", "440ci V8"]],
    [2008, 2023, ["3.6L V6", "5.7L Hemi V8", "6.4L Hemi V8", "6.2L Supercharged Hemi V8"]],
  ],
  "dodge|charger": [
    [1966, 1967, ["318ci V8", "383ci V8", "426ci Hemi V8"]],
    [1968, 1970, ["225ci Inline 6-Cylinder", "318ci V8", "383ci V8", "426ci Hemi V8", "440ci V8"]],
    [1971, 1974, ["225ci Inline 6-Cylinder", "318ci V8", "340ci V8", "400ci V8", "440ci V8"]],
    [2006, 2010, ["2.7L V6", "3.5L V6", "5.7L Hemi V8", "6.1L Hemi V8"]],
    [2011, 2023, ["3.6L V6", "5.7L Hemi V8", "6.4L Hemi V8", "6.2L Supercharged Hemi V8"]],
    [2024, 2027, ["3.0L Twin-Turbo Inline 6-Cylinder", "Electric"]],
  ],
  "dodge|viper": [
    [1992, 2002, ["8.0L V10"]],
    [2003, 2010, ["8.3L V10"]],
    [2013, 2017, ["8.4L V10"]],
  ],

  // === PLYMOUTH ===
  "plymouth|barracuda": [
    [1964, 1966, ["170ci Inline 6-Cylinder", "225ci Inline 6-Cylinder", "273ci V8"]],
    [1967, 1969, ["225ci Inline 6-Cylinder", "273ci V8", "318ci V8", "340ci V8", "383ci V8"]],
    [1970, 1974, ["225ci Inline 6-Cylinder", "318ci V8", "340ci V8", "383ci V8", "426ci Hemi V8", "440ci V8"]],
  ],
  "plymouth|road runner": [
    [1968, 1970, ["383ci V8", "426ci Hemi V8", "440ci V8"]],
    [1971, 1975, ["340ci V8", "383ci V8", "440ci V8"]],
  ],

  // === PONTIAC ===
  "pontiac|gto": [
    [1964, 1967, ["389ci V8"]],
    [1968, 1970, ["400ci V8", "455ci V8"]],
    [1971, 1974, ["400ci V8", "455ci V8"]],
    [2004, 2006, ["5.7L V8", "6.0L V8"]],
  ],
  "pontiac|firebird": [
    [1967, 1969, ["230ci Inline 6-Cylinder", "326ci V8", "350ci V8", "400ci V8"]],
    [1970, 1981, ["250ci Inline 6-Cylinder", "350ci V8", "400ci V8", "455ci V8"]],
    [1982, 1992, ["2.5L Inline 4-Cylinder", "2.8L V6", "5.0L V8", "5.7L V8"]],
    [1993, 2002, ["3.4L V6", "3.8L V6", "5.7L V8"]],
  ],
  "pontiac|trans am": [
    [1969, 1970, ["400ci V8"]],
    [1971, 1981, ["350ci V8", "400ci V8", "455ci V8"]],
    [1982, 1992, ["5.0L V8", "5.7L V8"]],
    [1993, 2002, ["5.7L V8"]],
  ],

  // === BMW ===
  "bmw|3 series": [
    [1975, 1983, ["1.8L Inline 4-Cylinder", "2.0L Inline 6-Cylinder"]],
    [1984, 1991, ["1.8L Inline 4-Cylinder", "2.5L Inline 6-Cylinder"]],
    [1992, 1998, ["1.8L Inline 4-Cylinder", "2.5L Inline 6-Cylinder", "2.8L Inline 6-Cylinder"]],
    [1999, 2005, ["2.5L Inline 6-Cylinder", "3.0L Inline 6-Cylinder"]],
    [2006, 2011, ["3.0L Inline 6-Cylinder", "3.0L Twin-Turbo Inline 6-Cylinder"]],
    [2012, 2018, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder"]],
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder"]],
  ],
  "bmw|m3": [
    [1988, 1991, ["2.3L Inline 4-Cylinder"]],
    [1995, 1999, ["3.2L Inline 6-Cylinder"]],
    [2001, 2006, ["3.2L Inline 6-Cylinder"]],
    [2008, 2013, ["4.0L V8"]],
    [2015, 2018, ["3.0L Twin-Turbo Inline 6-Cylinder"]],
    [2021, 2027, ["3.0L Twin-Turbo Inline 6-Cylinder"]],
  ],
  "bmw|5 series": [
    [1975, 1981, ["2.0L Inline 4-Cylinder", "2.8L Inline 6-Cylinder"]],
    [1982, 1988, ["2.5L Inline 6-Cylinder", "3.5L Inline 6-Cylinder"]],
    [1989, 1995, ["2.5L Inline 6-Cylinder", "3.0L Inline 6-Cylinder", "4.0L V8"]],
    [1996, 2003, ["2.5L Inline 6-Cylinder", "3.0L Inline 6-Cylinder", "4.4L V8"]],
    [2004, 2010, ["3.0L Inline 6-Cylinder", "4.8L V8"]],
    [2011, 2016, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder", "4.4L Twin-Turbo V8"]],
    [2017, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder", "4.4L Twin-Turbo V8"]],
  ],

  // === MERCEDES-BENZ ===
  "mercedes-benz|c-class": [
    [1994, 2000, ["2.3L Inline 4-Cylinder", "2.8L V6"]],
    [2001, 2007, ["1.8L Supercharged Inline 4-Cylinder", "2.6L V6", "3.2L V6"]],
    [2008, 2014, ["1.8L Turbo Inline 4-Cylinder", "3.0L V6", "3.5L V6", "6.2L V8"]],
    [2015, 2021, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo V6", "4.0L Twin-Turbo V8"]],
    [2022, 2027, ["1.5L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
  ],
  "mercedes-benz|e-class": [
    [1996, 2002, ["2.0L Inline 4-Cylinder", "2.8L V6", "3.2L V6", "4.3L V8", "5.4L V8"]],
    [2003, 2009, ["3.2L V6", "3.5L V6", "5.0L V8", "5.4L Supercharged V8"]],
    [2010, 2016, ["2.1L Turbo Diesel", "3.5L V6", "5.5L V8"]],
    [2017, 2023, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder", "4.0L Twin-Turbo V8"]],
    [2024, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder"]],
  ],

  // === PORSCHE ===
  "porsche|911": [
    [1965, 1973, ["2.0L Flat 6-Cylinder", "2.2L Flat 6-Cylinder", "2.4L Flat 6-Cylinder"]],
    [1974, 1977, ["2.7L Flat 6-Cylinder"]],
    [1978, 1983, ["3.0L Flat 6-Cylinder", "3.0L Turbo Flat 6-Cylinder", "3.3L Turbo Flat 6-Cylinder"]],
    [1984, 1989, ["3.2L Flat 6-Cylinder"]],
    [1990, 1994, ["3.6L Flat 6-Cylinder", "3.3L Turbo Flat 6-Cylinder"]],
    [1995, 1998, ["3.6L Flat 6-Cylinder", "3.6L Twin-Turbo Flat 6-Cylinder"]],
    [1999, 2004, ["3.4L Flat 6-Cylinder", "3.6L Flat 6-Cylinder", "3.6L Twin-Turbo Flat 6-Cylinder"]],
    [2005, 2011, ["3.6L Flat 6-Cylinder", "3.8L Flat 6-Cylinder"]],
    [2012, 2018, ["3.4L Flat 6-Cylinder", "3.8L Flat 6-Cylinder", "3.8L Twin-Turbo Flat 6-Cylinder"]],
    [2019, 2027, ["3.0L Twin-Turbo Flat 6-Cylinder", "3.7L Twin-Turbo Flat 6-Cylinder"]],
  ],
  "porsche|boxster": [
    [1997, 2004, ["2.5L Flat 6-Cylinder", "2.7L Flat 6-Cylinder", "3.2L Flat 6-Cylinder"]],
    [2005, 2012, ["2.7L Flat 6-Cylinder", "2.9L Flat 6-Cylinder", "3.4L Flat 6-Cylinder"]],
    [2013, 2016, ["2.7L Flat 6-Cylinder", "3.4L Flat 6-Cylinder"]],
    [2017, 2027, ["2.0L Turbo Flat 4-Cylinder", "2.5L Turbo Flat 4-Cylinder"]],
  ],
  "porsche|cayenne": [
    [2003, 2010, ["3.2L V6", "3.6L V6", "4.5L V8", "4.5L Turbo V8"]],
    [2011, 2017, ["3.0L V6 Diesel", "3.6L V6", "4.8L V8", "3.0L V6 Hybrid"]],
    [2019, 2027, ["3.0L Turbo V6", "4.0L Twin-Turbo V8", "3.0L V6 Hybrid"]],
  ],

  // === SUBARU ===
  "subaru|wrx": [
    [2002, 2005, ["2.0L Turbo Flat 4-Cylinder"]],
    [2006, 2014, ["2.5L Turbo Flat 4-Cylinder"]],
    [2015, 2021, ["2.0L Turbo Flat 4-Cylinder"]],
    [2022, 2027, ["2.4L Turbo Flat 4-Cylinder"]],
  ],
  "subaru|brz": [
    [2013, 2020, ["2.0L Flat 4-Cylinder"]],
    [2022, 2027, ["2.4L Flat 4-Cylinder"]],
  ],
  "subaru|outback": [
    [1995, 1999, ["2.2L Flat 4-Cylinder", "2.5L Flat 4-Cylinder"]],
    [2000, 2004, ["2.5L Flat 4-Cylinder", "3.0L Flat 6-Cylinder"]],
    [2005, 2009, ["2.5L Flat 4-Cylinder", "2.5L Turbo Flat 4-Cylinder", "3.0L Flat 6-Cylinder"]],
    [2010, 2014, ["2.5L Flat 4-Cylinder", "3.6L Flat 6-Cylinder"]],
    [2015, 2019, ["2.5L Flat 4-Cylinder", "3.6L Flat 6-Cylinder"]],
    [2020, 2027, ["2.5L Flat 4-Cylinder", "2.4L Turbo Flat 4-Cylinder"]],
  ],

  // === TESLA ===
  "tesla|model s": [
    [2012, 2027, ["Electric"]],
  ],
  "tesla|model 3": [
    [2017, 2027, ["Electric"]],
  ],
  "tesla|model x": [
    [2016, 2027, ["Electric"]],
  ],
  "tesla|model y": [
    [2020, 2027, ["Electric"]],
  ],
  "tesla|cybertruck": [
    [2024, 2027, ["Electric"]],
  ],

  // === JEEP ===
  "jeep|wrangler": [
    [1987, 1995, ["2.5L Inline 4-Cylinder", "4.0L Inline 6-Cylinder"]],
    [1997, 2006, ["2.4L Inline 4-Cylinder", "4.0L Inline 6-Cylinder"]],
    [2007, 2011, ["3.8L V6"]],
    [2012, 2017, ["3.6L V6"]],
    [2018, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.6L V6", "3.0L Turbo Diesel V6", "4xe Hybrid"]],
  ],
  "jeep|grand cherokee": [
    [1993, 1998, ["4.0L Inline 6-Cylinder", "5.2L V8", "5.9L V8"]],
    [1999, 2004, ["4.0L Inline 6-Cylinder", "4.7L V8"]],
    [2005, 2010, ["3.7L V6", "4.7L V8", "5.7L Hemi V8", "6.1L Hemi V8"]],
    [2011, 2021, ["3.6L V6", "5.7L Hemi V8", "6.4L Hemi V8", "3.0L Turbo Diesel V6"]],
    [2022, 2027, ["3.6L V6", "5.7L Hemi V8", "2.0L Turbo 4xe Hybrid"]],
  ],
  "jeep|cherokee": [
    [1984, 2001, ["2.5L Inline 4-Cylinder", "4.0L Inline 6-Cylinder"]],
    [2014, 2023, ["2.4L Inline 4-Cylinder", "3.2L V6", "2.0L Turbo Inline 4-Cylinder"]],
  ],

  // === VOLKSWAGEN ===
  "volkswagen|golf": [
    [1975, 1983, ["1.5L Inline 4-Cylinder", "1.6L Inline 4-Cylinder", "1.8L Inline 4-Cylinder"]],
    [1984, 1992, ["1.8L Inline 4-Cylinder"]],
    [1993, 1998, ["2.0L Inline 4-Cylinder", "2.8L VR6"]],
    [1999, 2005, ["1.8L Turbo Inline 4-Cylinder", "2.0L Inline 4-Cylinder", "2.8L VR6", "1.9L TDI Diesel"]],
    [2006, 2009, ["2.5L Inline 5-Cylinder", "2.0L Turbo Inline 4-Cylinder", "3.2L VR6"]],
    [2010, 2014, ["2.5L Inline 5-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.0L TDI Diesel"]],
    [2015, 2021, ["1.8L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [2022, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "volkswagen|gti": [
    [1983, 1992, ["1.8L Inline 4-Cylinder"]],
    [1993, 1998, ["2.0L Inline 4-Cylinder"]],
    [1999, 2005, ["1.8L Turbo Inline 4-Cylinder"]],
    [2006, 2009, ["2.0L Turbo Inline 4-Cylinder"]],
    [2010, 2014, ["2.0L Turbo Inline 4-Cylinder"]],
    [2015, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "volkswagen|jetta": [
    [1980, 1984, ["1.6L Inline 4-Cylinder", "1.7L Inline 4-Cylinder"]],
    [1985, 1992, ["1.8L Inline 4-Cylinder"]],
    [1993, 1998, ["2.0L Inline 4-Cylinder"]],
    [1999, 2005, ["2.0L Inline 4-Cylinder", "1.8L Turbo Inline 4-Cylinder", "2.8L VR6", "1.9L TDI Diesel"]],
    [2006, 2010, ["2.5L Inline 5-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [2011, 2018, ["2.0L Inline 4-Cylinder", "1.4L Turbo Inline 4-Cylinder", "1.8L Turbo Inline 4-Cylinder", "2.0L TDI Diesel"]],
    [2019, 2027, ["1.4L Turbo Inline 4-Cylinder", "1.5L Turbo Inline 4-Cylinder"]],
  ],

  // === AUDI ===
  "audi|a3": [
    [1996, 2003, ["1.8L Turbo Inline 4-Cylinder"]],
    [2006, 2013, ["2.0L Turbo Inline 4-Cylinder", "3.2L VR6"]],
    [2015, 2020, ["1.8L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [2022, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "audi|s3": [
    [2015, 2020, ["2.0L Turbo Inline 4-Cylinder"]],
    [2022, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "audi|a4": [
    [1996, 2001, ["1.8L Turbo Inline 4-Cylinder", "2.8L V6"]],
    [2002, 2005, ["1.8L Turbo Inline 4-Cylinder", "3.0L V6"]],
    [2006, 2008, ["2.0L Turbo Inline 4-Cylinder", "3.2L V6"]],
    [2009, 2016, ["2.0L Turbo Inline 4-Cylinder"]],
    [2017, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "audi|s4": [
    [1992, 1994, ["2.2L Turbo Inline 5-Cylinder"]],
    [2000, 2002, ["2.7L Twin-Turbo V6"]],
    [2004, 2008, ["4.2L V8"]],
    [2010, 2016, ["3.0L Supercharged V6"]],
    [2018, 2027, ["3.0L Turbo V6"]],
  ],
  "audi|a5": [
    [2008, 2016, ["2.0L Turbo Inline 4-Cylinder", "3.2L V6"]],
    [2018, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "audi|s5": [
    [2008, 2012, ["4.2L V8"]],
    [2013, 2017, ["3.0L Supercharged V6"]],
    [2018, 2027, ["3.0L Turbo V6"]],
  ],
  "audi|rs 5": [
    [2013, 2015, ["4.2L V8"]],
    [2018, 2027, ["2.9L Twin-Turbo V6"]],
  ],
  "audi|a6": [
    [1995, 1997, ["2.8L V6"]],
    [1998, 2004, ["2.7L Turbo V6", "2.8L V6", "3.0L V6", "4.2L V8"]],
    [2005, 2011, ["3.2L V6", "4.2L V8"]],
    [2012, 2018, ["2.0L Turbo Inline 4-Cylinder", "3.0L Supercharged V6"]],
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo V6"]],
  ],
  "audi|s6": [
    [1995, 1997, ["2.2L Turbo Inline 5-Cylinder"]],
    [2002, 2003, ["4.2L V8"]],
    [2007, 2011, ["5.2L V10"]],
    [2013, 2018, ["4.0L Twin-Turbo V8"]],
    [2020, 2027, ["2.9L Twin-Turbo V6"]],
  ],
  "audi|a7": [
    [2012, 2018, ["3.0L Supercharged V6"]],
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo V6"]],
  ],
  "audi|s7": [
    [2013, 2018, ["4.0L Twin-Turbo V8"]],
    [2020, 2027, ["2.9L Twin-Turbo V6"]],
  ],
  "audi|rs 7": [
    [2014, 2018, ["4.0L Twin-Turbo V8"]],
    [2020, 2027, ["4.0L Twin-Turbo V8"]],
  ],
  "audi|a8 l": [
    [1997, 2003, ["3.7L V8", "4.2L V8"]],
    [2004, 2010, ["4.2L V8", "6.0L W12"]],
    [2011, 2018, ["3.0L Supercharged V6", "4.0L Twin-Turbo V8", "6.3L W12"]],
    [2019, 2027, ["3.0L Turbo V6", "4.0L Twin-Turbo V8"]],
  ],
  "audi|q3": [
    [2015, 2018, ["2.0L Turbo Inline 4-Cylinder"]],
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "audi|q5": [
    [2009, 2017, ["2.0L Turbo Inline 4-Cylinder", "3.0L Supercharged V6", "3.0L TDI Diesel"]],
    [2018, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "audi|q5 e": [
    [2021, 2027, ["2.0L Turbo Inline 4-Cylinder Hybrid"]],
  ],
  "audi|sq5": [
    [2014, 2017, ["3.0L Supercharged V6"]],
    [2018, 2027, ["3.0L Turbo V6"]],
  ],
  "audi|q6": [
    [2025, 2027, ["Electric"]],
  ],
  "audi|sq6": [
    [2025, 2027, ["Electric"]],
  ],
  "audi|q7": [
    [2007, 2015, ["3.0L Supercharged V6", "3.0L TDI Diesel V6", "4.2L V8"]],
    [2017, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo V6"]],
  ],
  "audi|sq7": [
    [2020, 2027, ["4.0L Twin-Turbo V8"]],
  ],
  "audi|q8": [
    [2019, 2027, ["3.0L Turbo V6"]],
  ],
  "audi|sq8": [
    [2020, 2027, ["4.0L Twin-Turbo V8"]],
  ],
  "audi|rs q8": [
    [2020, 2027, ["4.0L Twin-Turbo V8"]],
  ],
  "audi|q4": [
    [2022, 2027, ["Electric"]],
  ],
  "audi|e-tron gt": [
    [2022, 2027, ["Electric"]],
  ],
  "audi|rs e-tron gt": [
    [2022, 2027, ["Electric"]],
  ],
  "audi|s e-tron gt": [
    [2025, 2027, ["Electric"]],
  ],
  "audi|rs 3": [
    [2017, 2020, ["2.5L Turbo Inline 5-Cylinder"]],
    [2022, 2027, ["2.5L Turbo Inline 5-Cylinder"]],
  ],
  "audi|rs 6 avant": [
    [2021, 2027, ["4.0L Twin-Turbo V8"]],
  ],
  "audi|a4 allroad": [
    [2013, 2016, ["2.0L Turbo Inline 4-Cylinder"]],
    [2017, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "audi|a6 allroad": [
    [2020, 2027, ["3.0L Turbo V6"]],
  ],

  // === ALFA ROMEO ===
  "alfa romeo|giulia (952)": [
    [2017, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.9L Twin-Turbo V6"]],
  ],
  "alfa romeo|giulia": [
    [2017, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.9L Twin-Turbo V6"]],
  ],
  "alfa romeo|stelvio": [
    [2018, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.9L Twin-Turbo V6"]],
  ],
  "alfa romeo|tonale": [
    [2023, 2027, ["1.3L Turbo Inline 4-Cylinder Hybrid"]],
  ],
  "alfa romeo|4c": [
    [2014, 2020, ["1.75L Turbo Inline 4-Cylinder"]],
  ],
  "alfa romeo|spider": [
    [1966, 1993, ["1.6L Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
  ],
  "alfa romeo|gtv": [
    [1995, 2006, ["2.0L Turbo Inline 4-Cylinder", "3.0L V6", "3.2L V6"]],
  ],

  // === GENESIS ===
  "genesis|g70": [
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.3L Twin-Turbo V6"]],
  ],
  "genesis|g80": [
    [2017, 2020, ["3.3L Twin-Turbo V6", "3.8L V6", "5.0L V8"]],
    [2021, 2027, ["2.5L Turbo Inline 4-Cylinder", "3.5L Twin-Turbo V6"]],
  ],
  "genesis|g90": [
    [2017, 2020, ["3.3L Twin-Turbo V6", "5.0L V8"]],
    [2023, 2027, ["3.5L Twin-Turbo V6"]],
  ],
  "genesis|gv70": [
    [2022, 2027, ["2.5L Turbo Inline 4-Cylinder", "3.5L Twin-Turbo V6", "Electric"]],
  ],
  "genesis|gv80": [
    [2021, 2027, ["2.5L Turbo Inline 4-Cylinder", "3.5L Twin-Turbo V6"]],
  ],

  // === INFINITI ===
  "infiniti|q50": [
    [2014, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Twin-Turbo V6"]],
  ],
  "infiniti|q60": [
    [2017, 2024, ["2.0L Turbo Inline 4-Cylinder", "3.0L Twin-Turbo V6"]],
  ],
  "infiniti|qx50": [
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "infiniti|qx60": [
    [2013, 2020, ["3.5L V6"]],
    [2022, 2027, ["3.5L V6"]],
  ],
  "infiniti|qx80": [
    [2011, 2027, ["5.6L V8"]],
  ],
  "infiniti|g35": [
    [2003, 2007, ["3.5L V6"]],
  ],
  "infiniti|g37": [
    [2008, 2013, ["3.7L V6"]],
  ],

  // === MASERATI ===
  "maserati|ghibli": [
    [2014, 2023, ["3.0L Twin-Turbo V6"]],
  ],
  "maserati|quattroporte": [
    [2004, 2012, ["4.2L V8", "4.7L V8"]],
    [2013, 2023, ["3.0L Twin-Turbo V6", "3.8L Twin-Turbo V8"]],
  ],
  "maserati|levante": [
    [2017, 2023, ["3.0L Twin-Turbo V6", "3.8L Twin-Turbo V8"]],
  ],
  "maserati|granturismo": [
    [2008, 2019, ["4.2L V8", "4.7L V8"]],
    [2023, 2027, ["3.0L Twin-Turbo V6", "Electric"]],
  ],
  "maserati|mc20": [
    [2022, 2027, ["3.0L Twin-Turbo V6"]],
  ],

  // === VOLVO ===
  "volvo|xc90": [
    [2003, 2014, ["3.2L Inline 6-Cylinder", "4.4L V8"]],
    [2016, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.0L Turbo+Supercharged Inline 4-Cylinder", "2.0L Hybrid"]],
  ],
  "volvo|xc60": [
    [2010, 2017, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder", "3.2L Inline 6-Cylinder"]],
    [2018, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.0L Turbo+Supercharged Inline 4-Cylinder", "2.0L Hybrid"]],
  ],
  "volvo|xc40": [
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder", "Electric"]],
  ],
  "volvo|s60": [
    [2001, 2009, ["2.4L Inline 5-Cylinder", "2.5L Turbo Inline 5-Cylinder"]],
    [2011, 2018, ["2.0L Turbo Inline 4-Cylinder", "2.5L Turbo Inline 5-Cylinder"]],
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.0L Turbo+Supercharged Inline 4-Cylinder", "2.0L Hybrid"]],
  ],

  // === LAND ROVER ===
  "land rover|range rover": [
    [1970, 1995, ["3.5L V8", "3.9L V8", "4.2L V8"]],
    [1996, 2001, ["4.0L V8", "4.6L V8"]],
    [2003, 2012, ["4.4L V8", "5.0L Supercharged V8"]],
    [2013, 2021, ["3.0L Supercharged V6", "5.0L Supercharged V8", "3.0L Diesel V6"]],
    [2022, 2027, ["3.0L Turbo Inline 6-Cylinder", "4.4L Twin-Turbo V8"]],
  ],
  "land rover|range rover sport": [
    [2006, 2013, ["4.2L Supercharged V8", "4.4L V8", "5.0L Supercharged V8"]],
    [2014, 2022, ["3.0L Supercharged V6", "5.0L Supercharged V8"]],
    [2023, 2027, ["3.0L Turbo Inline 6-Cylinder", "4.4L Twin-Turbo V8"]],
  ],
  "land rover|defender": [
    [1983, 2016, ["2.5L Inline 4-Cylinder Diesel", "3.5L V8", "2.5L Turbo Diesel"]],
    [2020, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo Inline 6-Cylinder"]],
  ],

  // === JAGUAR ===
  "jaguar|f-type": [
    [2014, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Supercharged V6", "5.0L Supercharged V8"]],
  ],
  "jaguar|xe": [
    [2017, 2024, ["2.0L Turbo Inline 4-Cylinder", "3.0L Supercharged V6"]],
  ],
  "jaguar|xf": [
    [2009, 2015, ["2.0L Turbo Inline 4-Cylinder", "3.0L Supercharged V6", "5.0L Supercharged V8"]],
    [2016, 2024, ["2.0L Turbo Inline 4-Cylinder", "3.0L Supercharged V6"]],
  ],
  "jaguar|e-type": [
    [1961, 1971, ["3.8L Inline 6-Cylinder", "4.2L Inline 6-Cylinder"]],
    [1971, 1975, ["5.3L V12"]],
  ],
  "jaguar|xk": [
    [1996, 2005, ["4.0L V8", "4.0L Supercharged V8"]],
    [2006, 2014, ["4.2L V8", "5.0L Supercharged V8"]],
  ],

  // === LINCOLN ===
  "lincoln|navigator": [
    [1998, 2002, ["5.4L V8"]],
    [2003, 2006, ["5.4L V8"]],
    [2007, 2017, ["5.4L V8"]],
    [2018, 2027, ["3.5L Twin-Turbo V6"]],
  ],
  "lincoln|aviator": [
    [2020, 2027, ["3.0L Twin-Turbo V6", "3.0L Twin-Turbo V6 Hybrid"]],
  ],
  "lincoln|corsair": [
    [2020, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.5L Hybrid"]],
  ],

  // === CADILLAC ===
  "cadillac|escalade": [
    [1999, 2006, ["5.3L V8", "6.0L V8", "6.2L V8"]],
    [2007, 2014, ["6.2L V8"]],
    [2015, 2020, ["6.2L V8"]],
    [2021, 2027, ["6.2L V8", "3.0L Turbo Diesel"]],
  ],
  "cadillac|ct5": [
    [2020, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Twin-Turbo V6"]],
  ],
  "cadillac|ct4": [
    [2020, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.7L Turbo Inline 4-Cylinder"]],
  ],
  "cadillac|xt5": [
    [2017, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.6L V6"]],
  ],

  // === GMC ===
  "gmc|sierra": [
    [1999, 2006, ["4.3L V6", "4.8L V8", "5.3L V8", "6.0L V8"]],
    [2007, 2013, ["4.3L V6", "4.8L V8", "5.3L V8", "6.0L V8", "6.2L V8"]],
    [2014, 2018, ["4.3L V6", "5.3L V8", "6.2L V8"]],
    [2019, 2027, ["2.7L Turbo Inline 4-Cylinder", "4.3L V6", "5.3L V8", "6.2L V8", "3.0L Turbo Diesel"]],
  ],
  "gmc|yukon": [
    [1995, 2006, ["4.8L V8", "5.3L V8", "6.0L V8"]],
    [2007, 2014, ["5.3L V8", "6.0L V8", "6.2L V8"]],
    [2015, 2020, ["5.3L V8", "6.2L V8"]],
    [2021, 2027, ["5.3L V8", "6.2L V8", "3.0L Turbo Diesel"]],
  ],

  // === RAM ===
  "ram|1500": [
    [2011, 2018, ["3.0L Turbo Diesel V6", "3.6L V6", "5.7L Hemi V8"]],
    [2019, 2027, ["3.0L Turbo Diesel V6", "3.6L V6", "5.7L Hemi V8", "3.6L Hybrid V6"]],
  ],
  "ram|2500": [
    [2003, 2009, ["5.7L Hemi V8", "5.9L Cummins Turbo Diesel"]],
    [2010, 2018, ["5.7L Hemi V8", "6.4L Hemi V8", "6.7L Cummins Turbo Diesel"]],
    [2019, 2027, ["6.4L Hemi V8", "6.7L Cummins Turbo Diesel"]],
  ],
  "ram|3500": [
    [2003, 2009, ["5.7L Hemi V8", "5.9L Cummins Turbo Diesel"]],
    [2010, 2018, ["5.7L Hemi V8", "6.4L Hemi V8", "6.7L Cummins Turbo Diesel"]],
    [2019, 2027, ["6.4L Hemi V8", "6.7L Cummins Turbo Diesel"]],
  ],

  // === MINI ===
  "mini|cooper": [
    [2002, 2006, ["1.6L Inline 4-Cylinder", "1.6L Supercharged Inline 4-Cylinder"]],
    [2007, 2013, ["1.6L Inline 4-Cylinder", "1.6L Turbo Inline 4-Cylinder"]],
    [2014, 2027, ["1.5L Turbo Inline 3-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
  ],

  // === HYUNDAI / KIA / GENESIS (continued) ===
  "hyundai|elantra": [
    [1992, 1995, ["1.6L Inline 4-Cylinder", "1.8L Inline 4-Cylinder"]],
    [1996, 2000, ["1.8L Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
    [2001, 2006, ["2.0L Inline 4-Cylinder"]],
    [2007, 2010, ["2.0L Inline 4-Cylinder"]],
    [2011, 2015, ["1.8L Inline 4-Cylinder"]],
    [2017, 2020, ["2.0L Inline 4-Cylinder", "1.4L Turbo Inline 4-Cylinder"]],
    [2021, 2027, ["2.0L Inline 4-Cylinder", "1.6L Turbo Inline 4-Cylinder", "1.6L Hybrid"]],
  ],
  "hyundai|sonata": [
    [1989, 1998, ["2.0L Inline 4-Cylinder", "3.0L V6"]],
    [1999, 2005, ["2.4L Inline 4-Cylinder", "2.7L V6"]],
    [2006, 2010, ["2.4L Inline 4-Cylinder", "3.3L V6"]],
    [2011, 2014, ["2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2015, 2019, ["1.6L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2020, 2027, ["1.6L Turbo Inline 4-Cylinder", "2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder"]],
  ],
  "hyundai|tucson": [
    [2005, 2009, ["2.0L Inline 4-Cylinder", "2.7L V6"]],
    [2010, 2015, ["2.0L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2016, 2021, ["1.6L Turbo Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
    [2022, 2027, ["2.5L Inline 4-Cylinder", "1.6L Turbo Hybrid"]],
  ],
  "hyundai|santa fe": [
    [2001, 2006, ["2.4L Inline 4-Cylinder", "2.7L V6", "3.5L V6"]],
    [2007, 2012, ["2.4L Inline 4-Cylinder", "3.3L V6"]],
    [2013, 2018, ["2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder", "3.3L V6"]],
    [2019, 2023, ["2.0L Turbo Inline 4-Cylinder", "2.5L Inline 4-Cylinder"]],
    [2024, 2027, ["2.5L Turbo Inline 4-Cylinder", "1.6L Turbo Hybrid"]],
  ],
  "hyundai|palisade": [
    [2020, 2027, ["3.8L V6"]],
  ],
  "kia|optima": [
    [2001, 2006, ["2.4L Inline 4-Cylinder", "2.7L V6"]],
    [2007, 2010, ["2.4L Inline 4-Cylinder", "2.7L V6"]],
    [2011, 2015, ["2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2016, 2020, ["1.6L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
  ],
  "kia|k5": [
    [2021, 2027, ["1.6L Turbo Inline 4-Cylinder", "2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder"]],
  ],
  "kia|sorento": [
    [2003, 2009, ["2.4L Inline 4-Cylinder", "3.3L V6", "3.5L V6"]],
    [2011, 2015, ["2.4L Inline 4-Cylinder", "3.3L V6"]],
    [2016, 2020, ["2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder", "3.3L V6"]],
    [2021, 2027, ["2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder", "1.6L Turbo Hybrid"]],
  ],
  "kia|telluride": [
    [2020, 2027, ["3.8L V6"]],
  ],
  "kia|sportage": [
    [2005, 2010, ["2.0L Inline 4-Cylinder", "2.7L V6"]],
    [2011, 2016, ["2.0L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2017, 2022, ["2.0L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2023, 2027, ["2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder", "1.6L Turbo Hybrid"]],
  ],
  "kia|stinger": [
    [2018, 2023, ["2.0L Turbo Inline 4-Cylinder", "3.3L Twin-Turbo V6"]],
  ],

  // === MITSUBISHI ===
  "mitsubishi|eclipse": [
    [1990, 1994, ["1.8L Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [1995, 1999, ["2.0L Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [2000, 2005, ["2.4L Inline 4-Cylinder", "3.0L V6"]],
    [2006, 2012, ["2.4L Inline 4-Cylinder", "3.8L V6"]],
  ],
  "mitsubishi|lancer": [
    [2002, 2007, ["2.0L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2008, 2017, ["2.0L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
  ],
  "mitsubishi|outlander": [
    [2003, 2006, ["2.4L Inline 4-Cylinder"]],
    [2007, 2013, ["2.4L Inline 4-Cylinder", "3.0L V6"]],
    [2014, 2021, ["2.4L Inline 4-Cylinder", "3.0L V6"]],
    [2022, 2027, ["2.5L Inline 4-Cylinder", "2.4L Hybrid"]],
  ],
  "mitsubishi|evo": [
    [2003, 2015, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "mitsubishi|3000gt": [
    [1991, 1999, ["3.0L V6", "3.0L Twin-Turbo V6"]],
  ],

  // === ASTON MARTIN ===
  "aston martin|db11": [
    [2017, 2024, ["4.0L Twin-Turbo V8", "5.2L Twin-Turbo V12"]],
  ],
  "aston martin|db12": [
    [2024, 2027, ["4.0L Twin-Turbo V8"]],
  ],
  "aston martin|vantage": [
    [2006, 2017, ["4.3L V8", "4.7L V8", "6.0L V12"]],
    [2019, 2027, ["4.0L Twin-Turbo V8"]],
  ],

  // === McLAREN ===
  "mclaren|720s": [
    [2018, 2024, ["4.0L Twin-Turbo V8"]],
  ],
  "mclaren|570s": [
    [2016, 2021, ["3.8L Twin-Turbo V8"]],
  ],
  "mclaren|gt": [
    [2020, 2027, ["4.0L Twin-Turbo V8"]],
  ],
  "mclaren|artura": [
    [2022, 2027, ["3.0L Twin-Turbo V6 Hybrid"]],
  ],

  // === FERRARI ===
  "ferrari|f40": [
    [1987, 1992, ["2.9L Twin-Turbo V8"]],
  ],
  "ferrari|f50": [
    [1995, 1997, ["4.7L V12"]],
  ],
  "ferrari|458 italia": [
    [2010, 2015, ["4.5L V8"]],
  ],
  "ferrari|488 gtb": [
    [2016, 2019, ["3.9L Twin-Turbo V8"]],
  ],
  "ferrari|f8 tributo": [
    [2020, 2023, ["3.9L Twin-Turbo V8"]],
  ],
  "ferrari|296 gtb": [
    [2022, 2027, ["3.0L Twin-Turbo V6 Hybrid"]],
  ],
  "ferrari|812 superfast": [
    [2018, 2023, ["6.5L V12"]],
  ],
  "ferrari|roma": [
    [2020, 2027, ["3.9L Twin-Turbo V8"]],
  ],
  "ferrari|sf90 stradale": [
    [2020, 2027, ["4.0L Twin-Turbo V8 Hybrid"]],
  ],

  // === LAMBORGHINI ===
  "lamborghini|huracán": [
    [2015, 2024, ["5.2L V10"]],
  ],
  "lamborghini|aventador": [
    [2011, 2022, ["6.5L V12"]],
  ],
  "lamborghini|gallardo": [
    [2004, 2013, ["5.0L V10", "5.2L V10"]],
  ],
  "lamborghini|countach": [
    [1974, 1990, ["3.9L V12", "4.8L V12", "5.2L V12"]],
  ],
  "lamborghini|murciélago": [
    [2002, 2010, ["6.2L V12", "6.5L V12"]],
  ],
  "lamborghini|urus": [
    [2019, 2027, ["4.0L Twin-Turbo V8"]],
  ],
  "lamborghini|revuelto": [
    [2024, 2027, ["6.5L V12 Hybrid"]],
  ],

  // === DODGE (additional) ===
  "dodge|durango": [
    [1998, 2003, ["3.9L V6", "4.7L V8", "5.2L V8", "5.9L V8"]],
    [2004, 2009, ["3.7L V6", "4.7L V8", "5.7L Hemi V8"]],
    [2011, 2027, ["3.6L V6", "5.7L Hemi V8", "6.4L Hemi V8"]],
  ],
  "dodge|ram 1500": [
    [1994, 2001, ["3.9L V6", "5.2L V8", "5.9L V8"]],
    [2002, 2008, ["3.7L V6", "4.7L V8", "5.7L Hemi V8"]],
    [2009, 2018, ["3.6L V6", "5.7L Hemi V8"]],
  ],

  // === BUICK ===
  "buick|enclave": [
    [2008, 2017, ["3.6L V6"]],
    [2018, 2027, ["3.6L V6"]],
  ],
  "buick|encore": [
    [2013, 2022, ["1.4L Turbo Inline 4-Cylinder"]],
  ],
  "buick|encore gx": [
    [2020, 2027, ["1.2L Turbo Inline 3-Cylinder", "1.3L Turbo Inline 3-Cylinder"]],
  ],

  // === CHRYSLER ===
  "chrysler|300": [
    [2005, 2010, ["2.7L V6", "3.5L V6", "5.7L Hemi V8", "6.1L Hemi V8"]],
    [2011, 2023, ["3.6L V6", "5.7L Hemi V8", "6.4L Hemi V8"]],
  ],
  "chrysler|pacifica": [
    [2017, 2027, ["3.6L V6", "3.6L V6 Hybrid"]],
  ],

  // === NISSAN (additional) ===
  "nissan|maxima": [
    [1995, 1999, ["3.0L V6"]],
    [2000, 2003, ["3.0L V6", "3.5L V6"]],
    [2004, 2008, ["3.5L V6"]],
    [2009, 2023, ["3.5L V6"]],
  ],
  "nissan|sentra": [
    [2000, 2006, ["1.8L Inline 4-Cylinder", "2.5L Inline 4-Cylinder"]],
    [2007, 2012, ["2.0L Inline 4-Cylinder", "2.5L Inline 4-Cylinder"]],
    [2013, 2019, ["1.8L Inline 4-Cylinder"]],
    [2020, 2027, ["2.0L Inline 4-Cylinder"]],
  ],
  "nissan|rogue": [
    [2008, 2013, ["2.5L Inline 4-Cylinder"]],
    [2014, 2020, ["2.5L Inline 4-Cylinder"]],
    [2021, 2027, ["1.5L Turbo Inline 3-Cylinder"]],
  ],
  "nissan|pathfinder": [
    [1996, 2004, ["3.3L V6", "3.5L V6"]],
    [2005, 2012, ["4.0L V6", "5.6L V8"]],
    [2013, 2020, ["3.5L V6"]],
    [2022, 2027, ["3.5L V6"]],
  ],
  "nissan|frontier": [
    [1998, 2004, ["2.4L Inline 4-Cylinder", "3.3L V6"]],
    [2005, 2021, ["2.5L Inline 4-Cylinder", "4.0L V6"]],
    [2022, 2027, ["3.8L V6"]],
  ],
  "nissan|titan": [
    [2004, 2015, ["5.6L V8"]],
    [2016, 2027, ["5.0L Turbo Diesel V8", "5.6L V8"]],
  ],

  // === DE TOMASO ===
  "de tomaso|pantera": [
    [1971, 1992, ["5.8L V8 (351 Cleveland)"]],
  ],
  "de tomaso|mangusta": [
    [1967, 1971, ["4.7L V8 (289)", "4.9L V8 (302)"]],
  ],

  // === TOYOTA (additional) ===
  "toyota|tundra": [
    [2000, 2006, ["3.4L V6", "4.7L V8"]],
    [2007, 2013, ["4.0L V6", "4.6L V8", "5.7L V8"]],
    [2014, 2021, ["4.6L V8", "5.7L V8"]],
    [2022, 2027, ["3.5L Twin-Turbo V6", "3.5L Twin-Turbo V6 Hybrid"]],
  ],
  "toyota|highlander": [
    [2001, 2007, ["2.4L Inline 4-Cylinder", "3.0L V6", "3.3L V6"]],
    [2008, 2013, ["2.7L Inline 4-Cylinder", "3.5L V6"]],
    [2014, 2019, ["2.7L Inline 4-Cylinder", "3.5L V6", "3.5L V6 Hybrid"]],
    [2020, 2027, ["2.5L Inline 4-Cylinder Hybrid", "2.4L Turbo Inline 4-Cylinder"]],
  ],
  "toyota|rav4": [
    [1996, 2000, ["2.0L Inline 4-Cylinder"]],
    [2001, 2005, ["2.0L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2006, 2012, ["2.4L Inline 4-Cylinder", "2.5L Inline 4-Cylinder", "3.5L V6"]],
    [2013, 2018, ["2.5L Inline 4-Cylinder"]],
    [2019, 2027, ["2.5L Inline 4-Cylinder", "2.5L Hybrid"]],
  ],
  "toyota|86": [
    [2017, 2020, ["2.0L Flat 4-Cylinder"]],
    [2022, 2027, ["2.4L Flat 4-Cylinder"]],
  ],
  "toyota|gr86": [
    [2022, 2027, ["2.4L Flat 4-Cylinder"]],
  ],
  "toyota|celica": [
    [1971, 1977, ["1.6L Inline 4-Cylinder", "2.0L Inline 4-Cylinder", "2.2L Inline 4-Cylinder"]],
    [1978, 1981, ["2.2L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [1982, 1985, ["2.4L Inline 4-Cylinder"]],
    [1986, 1989, ["2.0L Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [1990, 1993, ["1.6L Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.2L Inline 4-Cylinder"]],
    [1994, 1999, ["1.8L Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.2L Inline 4-Cylinder"]],
    [2000, 2005, ["1.8L Inline 4-Cylinder"]],
  ],
  "toyota|sequoia": [
    [2001, 2007, ["4.7L V8"]],
    [2008, 2022, ["5.7L V8"]],
    [2023, 2027, ["3.5L Twin-Turbo V6 Hybrid"]],
  ],

  // === HONDA (additional) ===
  "honda|pilot": [
    [2003, 2008, ["3.5L V6"]],
    [2009, 2015, ["3.5L V6"]],
    [2016, 2022, ["3.5L V6"]],
    [2023, 2027, ["3.5L V6"]],
  ],
  "honda|odyssey": [
    [1995, 1998, ["2.2L Inline 4-Cylinder"]],
    [1999, 2004, ["3.5L V6"]],
    [2005, 2010, ["3.5L V6"]],
    [2011, 2017, ["3.5L V6"]],
    [2018, 2027, ["3.5L V6"]],
  ],
  "honda|hr-v": [
    [2016, 2022, ["1.8L Inline 4-Cylinder"]],
    [2023, 2027, ["2.0L Inline 4-Cylinder"]],
  ],
  "honda|ridgeline": [
    [2006, 2014, ["3.5L V6"]],
    [2017, 2027, ["3.5L V6"]],
  ],
  "honda|element": [
    [2003, 2011, ["2.4L Inline 4-Cylinder"]],
  ],
  "honda|fit": [
    [2007, 2014, ["1.5L Inline 4-Cylinder"]],
    [2015, 2020, ["1.5L Inline 4-Cylinder"]],
  ],
  "honda|del sol": [
    [1993, 1997, ["1.5L Inline 4-Cylinder", "1.6L VTEC Inline 4-Cylinder"]],
  ],

  // === FORD (additional) ===
  "ford|explorer": [
    [1991, 1994, ["4.0L V6"]],
    [1995, 2001, ["4.0L V6", "5.0L V8"]],
    [2002, 2005, ["4.0L V6", "4.6L V8"]],
    [2006, 2010, ["4.0L V6", "4.6L V8"]],
    [2011, 2019, ["2.0L Turbo Inline 4-Cylinder", "2.3L Turbo Inline 4-Cylinder", "3.5L V6", "3.5L Turbo V6"]],
    [2020, 2027, ["2.3L Turbo Inline 4-Cylinder", "3.0L Turbo V6", "3.3L Hybrid V6"]],
  ],
  "ford|escape": [
    [2001, 2007, ["2.0L Inline 4-Cylinder", "3.0L V6"]],
    [2008, 2012, ["2.3L Inline 4-Cylinder", "2.5L Inline 4-Cylinder", "3.0L V6"]],
    [2013, 2019, ["1.6L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.5L Inline 4-Cylinder"]],
    [2020, 2027, ["1.5L Turbo Inline 3-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.5L Hybrid"]],
  ],
  "ford|ranger": [
    [1983, 1992, ["2.0L Inline 4-Cylinder", "2.3L Inline 4-Cylinder", "2.9L V6", "4.0L V6"]],
    [1993, 1997, ["2.3L Inline 4-Cylinder", "3.0L V6", "4.0L V6"]],
    [1998, 2011, ["2.3L Inline 4-Cylinder", "3.0L V6", "4.0L V6"]],
    [2019, 2027, ["2.3L Turbo Inline 4-Cylinder"]],
  ],
  "ford|edge": [
    [2007, 2014, ["2.0L Turbo Inline 4-Cylinder", "3.5L V6", "3.7L V6"]],
    [2015, 2024, ["2.0L Turbo Inline 4-Cylinder", "2.7L Turbo V6"]],
  ],
  "ford|expedition": [
    [1997, 2002, ["4.6L V8", "5.4L V8"]],
    [2003, 2006, ["4.6L V8", "5.4L V8"]],
    [2007, 2017, ["5.4L V8"]],
    [2018, 2027, ["3.5L Twin-Turbo V6"]],
  ],
  "ford|maverick": [
    [2022, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.5L Hybrid"]],
  ],
  "ford|gt": [
    [2005, 2006, ["5.4L Supercharged V8"]],
    [2017, 2022, ["3.5L Twin-Turbo V6"]],
  ],
  "ford|thunderbird": [
    [1955, 1957, ["292ci V8", "312ci V8"]],
    [1958, 1966, ["352ci V8", "390ci V8", "428ci V8"]],
    [1967, 1971, ["390ci V8", "429ci V8"]],
    [1972, 1976, ["460ci V8"]],
    [1977, 1979, ["302ci V8", "351ci V8"]],
    [1980, 1982, ["3.3L Inline 6-Cylinder", "4.2L V8", "5.0L V8"]],
    [1983, 1988, ["2.3L Turbo Inline 4-Cylinder", "3.8L V6", "5.0L V8"]],
    [1989, 1997, ["3.8L V6", "3.8L Supercharged V6", "5.0L V8"]],
    [2002, 2005, ["3.9L V8"]],
  ],

  // === CHEVROLET (additional) ===
  "chevrolet|tahoe": [
    [1995, 1999, ["5.7L V8"]],
    [2000, 2006, ["4.8L V8", "5.3L V8"]],
    [2007, 2014, ["5.3L V8"]],
    [2015, 2020, ["5.3L V8"]],
    [2021, 2027, ["5.3L V8", "6.2L V8", "3.0L Turbo Diesel"]],
  ],
  "chevrolet|suburban": [
    [1973, 1991, ["350ci V8", "454ci V8"]],
    [1992, 1999, ["5.7L V8"]],
    [2000, 2006, ["5.3L V8", "6.0L V8"]],
    [2007, 2014, ["5.3L V8", "6.0L V8"]],
    [2015, 2020, ["5.3L V8"]],
    [2021, 2027, ["5.3L V8", "6.2L V8", "3.0L Turbo Diesel"]],
  ],
  "chevrolet|colorado": [
    [2004, 2012, ["2.8L Inline 4-Cylinder", "2.9L Inline 4-Cylinder", "3.5L Inline 5-Cylinder", "3.7L Inline 5-Cylinder"]],
    [2015, 2023, ["2.5L Inline 4-Cylinder", "3.6L V6", "2.8L Turbo Diesel"]],
    [2024, 2027, ["2.7L Turbo Inline 4-Cylinder"]],
  ],
  "chevrolet|equinox": [
    [2005, 2009, ["3.4L V6", "3.6L V6"]],
    [2010, 2017, ["2.4L Inline 4-Cylinder", "3.0L V6", "3.6L V6"]],
    [2018, 2024, ["1.5L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [2025, 2027, ["1.5L Turbo Inline 4-Cylinder", "Electric"]],
  ],
  "chevrolet|malibu": [
    [1964, 1967, ["230ci Inline 6-Cylinder", "283ci V8", "327ci V8", "396ci V8"]],
    [1968, 1972, ["250ci Inline 6-Cylinder", "307ci V8", "350ci V8", "396ci V8", "454ci V8"]],
    [1973, 1977, ["250ci Inline 6-Cylinder", "350ci V8"]],
    [1978, 1983, ["3.3L V6", "3.8L V6", "5.0L V8"]],
    [1997, 2003, ["2.4L Inline 4-Cylinder", "3.1L V6"]],
    [2004, 2007, ["2.2L Inline 4-Cylinder", "3.5L V6"]],
    [2008, 2012, ["2.4L Inline 4-Cylinder", "3.6L V6"]],
    [2013, 2015, ["2.5L Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
    [2016, 2024, ["1.5L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder"]],
  ],
  "chevrolet|traverse": [
    [2009, 2017, ["3.6L V6"]],
    [2018, 2027, ["3.6L V6", "2.5L Inline 4-Cylinder"]],
  ],
  "chevrolet|blazer": [
    [1969, 1972, ["250ci Inline 6-Cylinder", "350ci V8"]],
    [1973, 1991, ["4.3L V6", "5.0L V8", "5.7L V8"]],
    [1992, 1994, ["4.3L V6"]],
    [1995, 2005, ["4.3L V6"]],
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder", "2.5L Inline 4-Cylinder", "3.6L V6"]],
  ],
  "chevrolet|el camino": [
    [1959, 1960, ["235ci Inline 6-Cylinder", "283ci V8", "348ci V8"]],
    [1964, 1967, ["230ci Inline 6-Cylinder", "283ci V8", "327ci V8", "396ci V8"]],
    [1968, 1972, ["250ci Inline 6-Cylinder", "307ci V8", "350ci V8", "396ci V8", "454ci V8"]],
    [1973, 1977, ["250ci Inline 6-Cylinder", "350ci V8", "454ci V8"]],
    [1978, 1987, ["3.3L V6", "3.8L V6", "5.0L V8"]],
  ],
  "chevrolet|nova": [
    [1962, 1967, ["194ci Inline 6-Cylinder", "230ci Inline 6-Cylinder", "283ci V8", "327ci V8"]],
    [1968, 1974, ["230ci Inline 6-Cylinder", "250ci Inline 6-Cylinder", "307ci V8", "350ci V8", "396ci V8"]],
    [1975, 1979, ["250ci Inline 6-Cylinder", "305ci V8", "350ci V8"]],
  ],
  "chevrolet|bolt": [
    [2017, 2023, ["Electric"]],
  ],
  "chevrolet|bolt euv": [
    [2022, 2023, ["Electric"]],
  ],
  "chevrolet|trax": [
    [2015, 2022, ["1.4L Turbo Inline 4-Cylinder"]],
    [2024, 2027, ["1.2L Turbo Inline 3-Cylinder"]],
  ],

  // === CHRYSLER (additional) ===
  "chrysler|town & country": [
    [1996, 2007, ["3.3L V6", "3.8L V6"]],
    [2008, 2016, ["3.6L V6"]],
  ],
  "chrysler|pt cruiser": [
    [2001, 2010, ["2.4L Inline 4-Cylinder", "2.4L Turbo Inline 4-Cylinder"]],
  ],

  // === BUICK (additional) ===
  "buick|regal": [
    [1973, 1977, ["350ci V8", "455ci V8"]],
    [1978, 1987, ["3.8L V6", "3.8L Turbo V6", "4.1L V6", "5.0L V8"]],
    [2011, 2017, ["2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2018, 2020, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "buick|grand national": [
    [1982, 1987, ["3.8L Turbo V6"]],
  ],
  "buick|lacrosse": [
    [2005, 2009, ["3.6L V6", "3.8L V6"]],
    [2010, 2016, ["2.4L Inline 4-Cylinder", "3.6L V6"]],
    [2017, 2019, ["2.5L Inline 4-Cylinder", "3.6L V6"]],
  ],
  "buick|riviera": [
    [1963, 1970, ["401ci V8", "425ci V8", "430ci V8", "455ci V8"]],
    [1971, 1978, ["350ci V8", "455ci V8"]],
    [1979, 1985, ["3.8L V6", "4.1L V6", "5.0L V8"]],
    [1986, 1993, ["3.8L V6"]],
    [1995, 1999, ["3.8L V6", "3.8L Supercharged V6"]],
  ],

  // === OLDSMOBILE ===
  "oldsmobile|442": [
    [1964, 1967, ["330ci V8", "400ci V8"]],
    [1968, 1971, ["350ci V8", "400ci V8", "455ci V8"]],
    [1972, 1977, ["350ci V8", "455ci V8"]],
  ],
  "oldsmobile|cutlass": [
    [1961, 1967, ["330ci V8"]],
    [1968, 1972, ["250ci Inline 6-Cylinder", "350ci V8", "455ci V8"]],
    [1973, 1977, ["250ci Inline 6-Cylinder", "350ci V8", "455ci V8"]],
    [1978, 1988, ["3.8L V6", "4.3L V8", "5.0L V8"]],
    [1997, 1999, ["2.4L Inline 4-Cylinder", "3.1L V6"]],
  ],
  "oldsmobile|toronado": [
    [1966, 1970, ["425ci V8", "455ci V8"]],
    [1971, 1978, ["350ci V8", "455ci V8"]],
    [1979, 1985, ["307ci V8", "350ci V8", "5.7L Diesel V8"]],
    [1986, 1992, ["3.8L V6"]],
  ],

  // === MERCURY ===
  "mercury|cougar": [
    [1967, 1970, ["289ci V8", "302ci V8", "351ci V8", "390ci V8", "428ci V8"]],
    [1971, 1973, ["351ci V8", "429ci V8"]],
    [1974, 1979, ["302ci V8", "351ci V8"]],
    [1999, 2002, ["2.0L Inline 4-Cylinder", "2.5L V6"]],
  ],

  // === STUDEBAKER ===
  "studebaker|avanti": [
    [1962, 1963, ["289ci V8", "289ci Supercharged V8"]],
  ],
  "studebaker|hawk": [
    [1956, 1964, ["289ci V8"]],
  ],

  // === SHELBY ===
  "shelby|cobra": [
    [1962, 1967, ["260ci V8", "289ci V8", "427ci V8"]],
  ],
  "shelby|gt350": [
    [1965, 1970, ["289ci V8", "302ci V8"]],
  ],
  "shelby|gt500": [
    [1967, 1970, ["428ci V8"]],
    [2007, 2014, ["5.4L Supercharged V8"]],
    [2020, 2022, ["5.2L Supercharged V8"]],
  ],

  // === SATURN ===
  "saturn|s-series": [
    [1991, 2002, ["1.9L Inline 4-Cylinder"]],
  ],
  "saturn|ion": [
    [2003, 2007, ["2.2L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
  ],
  "saturn|vue": [
    [2002, 2007, ["2.2L Inline 4-Cylinder", "3.5L V6"]],
    [2008, 2010, ["2.4L Inline 4-Cylinder", "3.5L V6", "3.6L V6"]],
  ],
  "saturn|sky": [
    [2007, 2010, ["2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
  ],

  // === SCION ===
  "scion|fr-s": [
    [2013, 2016, ["2.0L Flat 4-Cylinder"]],
  ],
  "scion|tc": [
    [2005, 2010, ["2.4L Inline 4-Cylinder"]],
    [2011, 2016, ["2.5L Inline 4-Cylinder"]],
  ],
  "scion|xb": [
    [2004, 2006, ["1.5L Inline 4-Cylinder"]],
    [2008, 2015, ["2.4L Inline 4-Cylinder"]],
  ],

  // === SUZUKI ===
  "suzuki|samurai": [
    [1986, 1995, ["1.3L Inline 4-Cylinder"]],
  ],
  "suzuki|jimny": [
    [1998, 2027, ["1.3L Inline 4-Cylinder", "1.5L Inline 4-Cylinder"]],
  ],

  // === SAAB ===
  "saab|9-3": [
    [1999, 2002, ["2.0L Turbo Inline 4-Cylinder"]],
    [2003, 2011, ["2.0L Turbo Inline 4-Cylinder", "2.8L Turbo V6"]],
  ],
  "saab|9-5": [
    [1999, 2009, ["2.3L Turbo Inline 4-Cylinder", "3.0L Turbo V6"]],
    [2010, 2011, ["2.0L Turbo Inline 4-Cylinder", "2.8L Turbo V6"]],
  ],
  "saab|900": [
    [1979, 1993, ["2.0L Turbo Inline 4-Cylinder"]],
    [1994, 1998, ["2.0L Inline 4-Cylinder", "2.3L Inline 4-Cylinder", "2.5L V6"]],
  ],

  // === ROLLS-ROYCE ===
  "rolls-royce|silver shadow": [
    [1965, 1980, ["6.75L V8"]],
  ],
  "rolls-royce|phantom": [
    [2003, 2017, ["6.75L V12"]],
    [2018, 2027, ["6.75L Twin-Turbo V12"]],
  ],
  "rolls-royce|ghost": [
    [2010, 2020, ["6.6L Twin-Turbo V12"]],
    [2021, 2027, ["6.75L Twin-Turbo V12"]],
  ],
  "rolls-royce|wraith": [
    [2014, 2023, ["6.6L Twin-Turbo V12"]],
  ],
  "rolls-royce|cullinan": [
    [2019, 2027, ["6.75L Twin-Turbo V12"]],
  ],

  // === BENTLEY ===
  "bentley|continental gt": [
    [2003, 2018, ["6.0L Twin-Turbo W12", "4.0L Twin-Turbo V8"]],
    [2019, 2027, ["6.0L Twin-Turbo W12", "4.0L Twin-Turbo V8"]],
  ],
  "bentley|flying spur": [
    [2005, 2019, ["6.0L Twin-Turbo W12"]],
    [2020, 2027, ["6.0L Twin-Turbo W12", "4.0L Twin-Turbo V8"]],
  ],
  "bentley|bentayga": [
    [2016, 2027, ["6.0L Twin-Turbo W12", "4.0L Twin-Turbo V8", "3.0L Turbo V6 Hybrid"]],
  ],

  // === RIVIAN ===
  "rivian|r1t": [
    [2022, 2027, ["Electric"]],
  ],
  "rivian|r1s": [
    [2022, 2027, ["Electric"]],
  ],

  // === POLESTAR ===
  "polestar|2": [
    [2021, 2027, ["Electric"]],
  ],
  "polestar|3": [
    [2024, 2027, ["Electric"]],
  ],
  "polestar|4": [
    [2025, 2027, ["Electric"]],
  ],

  // === NISSAN (additional) ===
  "nissan|murano": [
    [2003, 2007, ["3.5L V6"]],
    [2009, 2014, ["3.5L V6"]],
    [2015, 2027, ["3.5L V6"]],
  ],
  "nissan|armada": [
    [2004, 2015, ["5.6L V8"]],
    [2017, 2027, ["5.6L V8"]],
  ],
  "nissan|versa": [
    [2007, 2011, ["1.6L Inline 4-Cylinder", "1.8L Inline 4-Cylinder"]],
    [2012, 2019, ["1.6L Inline 4-Cylinder"]],
    [2020, 2027, ["1.6L Inline 4-Cylinder"]],
  ],
  "nissan|leaf": [
    [2011, 2027, ["Electric"]],
  ],
  "nissan|kicks": [
    [2018, 2027, ["1.6L Inline 4-Cylinder"]],
  ],

  // === MAZDA (additional) ===
  "mazda|cx-5": [
    [2013, 2016, ["2.0L Inline 4-Cylinder", "2.5L Inline 4-Cylinder"]],
    [2017, 2027, ["2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder"]],
  ],
  "mazda|cx-9": [
    [2007, 2015, ["3.5L V6", "3.7L V6"]],
    [2016, 2023, ["2.5L Turbo Inline 4-Cylinder"]],
  ],
  "mazda|cx-50": [
    [2023, 2027, ["2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder"]],
  ],
  "mazda|cx-30": [
    [2020, 2027, ["2.0L Inline 4-Cylinder", "2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder"]],
  ],
  "mazda|6": [
    [2003, 2008, ["2.3L Inline 4-Cylinder", "3.0L V6"]],
    [2009, 2013, ["2.5L Inline 4-Cylinder", "3.7L V6"]],
    [2014, 2021, ["2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder"]],
  ],

  // === ACURA (additional) ===
  "acura|tsx": [
    [2004, 2008, ["2.4L Inline 4-Cylinder"]],
    [2009, 2014, ["2.4L Inline 4-Cylinder", "3.5L V6"]],
  ],
  "acura|ilx": [
    [2013, 2022, ["2.0L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
  ],
  "acura|zdx": [
    [2010, 2013, ["3.7L V6"]],
    [2024, 2027, ["Electric"]],
  ],

  // === LEXUS (additional) ===
  "lexus|nx 350h": [
    [2022, 2027, ["2.5L Inline 4-Cylinder Hybrid"]],
  ],
  "lexus|nx 350": [
    [2022, 2027, ["2.4L Turbo Inline 4-Cylinder"]],
  ],
  "lexus|gx 460": [
    [2010, 2023, ["4.6L V8"]],
  ],
  "lexus|gx 550": [
    [2024, 2027, ["3.5L Twin-Turbo V6"]],
  ],
  "lexus|lx 570": [
    [2008, 2021, ["5.7L V8"]],
  ],
  "lexus|lx 600": [
    [2022, 2027, ["3.5L Twin-Turbo V6"]],
  ],
  "lexus|ux 250h": [
    [2019, 2027, ["2.0L Inline 4-Cylinder Hybrid"]],
  ],

  // === HYUNDAI (additional) ===
  "hyundai|kona": [
    [2018, 2023, ["2.0L Inline 4-Cylinder", "1.6L Turbo Inline 4-Cylinder"]],
    [2024, 2027, ["2.0L Inline 4-Cylinder", "1.6L Turbo Inline 4-Cylinder", "Electric"]],
  ],
  "hyundai|ioniq 5": [
    [2022, 2027, ["Electric"]],
  ],
  "hyundai|ioniq 6": [
    [2023, 2027, ["Electric"]],
  ],
  "hyundai|venue": [
    [2020, 2027, ["1.6L Inline 4-Cylinder"]],
  ],
  "hyundai|genesis coupe": [
    [2010, 2016, ["2.0L Turbo Inline 4-Cylinder", "3.8L V6"]],
  ],

  // === KIA (additional) ===
  "kia|ev6": [
    [2022, 2027, ["Electric"]],
  ],
  "kia|ev9": [
    [2024, 2027, ["Electric"]],
  ],
  "kia|forte": [
    [2010, 2013, ["2.0L Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2014, 2018, ["1.8L Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
    [2019, 2027, ["2.0L Inline 4-Cylinder", "1.6L Turbo Inline 4-Cylinder"]],
  ],
  "kia|soul": [
    [2010, 2013, ["1.6L Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
    [2014, 2019, ["1.6L Inline 4-Cylinder", "2.0L Inline 4-Cylinder"]],
    [2020, 2027, ["2.0L Inline 4-Cylinder"]],
  ],
  "kia|carnival": [
    [2022, 2027, ["3.5L V6"]],
  ],
  "kia|niro": [
    [2017, 2022, ["1.6L Inline 4-Cylinder Hybrid"]],
    [2023, 2027, ["1.6L Inline 4-Cylinder Hybrid", "Electric"]],
  ],
};

/**
 * Look up model-specific engines for a given year/make/model.
 * Returns null if no specific mapping exists (caller should use fallback logic).
 */
export function getModelEngines(year: number, make: string, model: string): string[] | null {
  const key = `${make}|${model}`.toLowerCase();
  const entries = ENGINE_DB[key];
  if (!entries) return null;

  for (const [start, end, engines] of entries) {
    if (year >= start && year <= end) {
      return [...engines];
    }
  }

  return null;
}
