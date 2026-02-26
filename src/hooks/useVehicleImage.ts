import { useState, useEffect } from "react";

const WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1/page/summary";

/**
 * Tries multiple Wikipedia search terms to find an image for the selected vehicle.
 * Falls back to the default hero image if nothing is found.
 */
export const useVehicleImage = (year: string, make: string, model: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!make || !model) {
      setImageUrl(null);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    // Build candidate search terms in priority order
    const cleanModel = model.replace(" / Custom", "").replace("Other", "").trim();
    const cleanMake = make.replace(/\s*\(.*\)/, ""); // "American Motors (AMC)" -> "American Motors"

    const candidates = [
      `${cleanMake}_${cleanModel}`,                        // e.g. Chevrolet_Camaro
      `${cleanMake}_${cleanModel}_(${year})`,              // e.g. Chevrolet_Camaro_(1975)
      `${year}_${cleanMake}_${cleanModel}`,                // e.g. 1975_Chevrolet_Camaro
      `${cleanMake}_${cleanModel}_(automobile)`,           // disambiguation
      `${cleanModel}_(car)`,                               // e.g. Camaro_(car)
      cleanMake,                                           // fallback to just the make
    ].filter(c => c && !c.includes("_Other") && !c.includes("__"));

    const tryFetch = async () => {
      for (const term of candidates) {
        if (controller.signal.aborted) return;
        try {
          const res = await fetch(
            `${WIKIPEDIA_API}/${encodeURIComponent(term.replace(/ /g, "_"))}`,
            { signal: controller.signal }
          );
          if (!res.ok) continue;
          const data = await res.json();
          const img = data.originalimage?.source || data.thumbnail?.source;
          if (img) {
            setImageUrl(img);
            setIsLoading(false);
            return;
          }
        } catch {
          // continue to next candidate
        }
      }
      // Nothing found
      setImageUrl(null);
      setIsLoading(false);
    };

    tryFetch();

    return () => controller.abort();
  }, [year, make, model]);

  return { vehicleImageUrl: imageUrl, isLoadingImage: isLoading };
};
