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
  "audi|a4": [
    [1996, 2001, ["1.8L Turbo Inline 4-Cylinder", "2.8L V6"]],
    [2002, 2005, ["1.8L Turbo Inline 4-Cylinder", "3.0L V6"]],
    [2006, 2008, ["2.0L Turbo Inline 4-Cylinder", "3.2L V6"]],
    [2009, 2016, ["2.0L Turbo Inline 4-Cylinder"]],
    [2017, 2027, ["2.0L Turbo Inline 4-Cylinder"]],
  ],
  "audi|a6": [
    [1995, 1997, ["2.8L V6"]],
    [1998, 2004, ["2.7L Turbo V6", "2.8L V6", "3.0L V6", "4.2L V8"]],
    [2005, 2011, ["3.2L V6", "4.2L V8"]],
    [2012, 2018, ["2.0L Turbo Inline 4-Cylinder", "3.0L Supercharged V6"]],
    [2019, 2027, ["2.0L Turbo Inline 4-Cylinder", "3.0L Turbo V6"]],
  ],

  // === HYUNDAI / KIA / GENESIS ===
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
  "kia|optima": [
    [2001, 2006, ["2.4L Inline 4-Cylinder", "2.7L V6"]],
    [2007, 2010, ["2.4L Inline 4-Cylinder", "2.7L V6"]],
    [2011, 2015, ["2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
    [2016, 2020, ["1.6L Turbo Inline 4-Cylinder", "2.0L Turbo Inline 4-Cylinder", "2.4L Inline 4-Cylinder"]],
  ],
  "kia|k5": [
    [2021, 2027, ["1.6L Turbo Inline 4-Cylinder", "2.5L Inline 4-Cylinder", "2.5L Turbo Inline 4-Cylinder"]],
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
