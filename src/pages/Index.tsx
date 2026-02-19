import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import VehicleSelector from "@/components/VehicleSelector";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { useVehicleData } from "@/hooks/useVehicleData";
import { getRandomCarImage } from "@/lib/classicCarImages";
import { Flame, Gauge, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RepairGuideObject {
  steps?: string[];
  toolsNeeded?: string[];
  safetyWarnings?: string[];
  [key: string]: unknown;
}

interface PartListing {
  retailer: string;
  url: string;
  price: string;
  type: "OEM" | "Aftermarket";
  brand?: string;
}

interface Part {
  name: string;
  listings: PartListing[];
}

interface RepairResult {
  repairGuide: string | RepairGuideObject;
  commonCauses: string[];
  estimatedDifficulty: string;
  forumDiscussions: { title: string; summary: string; community: string }[];
  youtubeSearches: string[];
  partsNeeded: string[];
  parts?: Part[];
}

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<RepairResult | null>(null);
  const [lastSearchedIssue, setLastSearchedIssue] = useState("");
  const vehicleData = useVehicleData();
  const heroImage = useMemo(() => getRandomCarImage(), []);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const vehicleLabel = [vehicleData.year, vehicleData.make, vehicleData.model, vehicleData.trim]
    .filter(Boolean)
    .join(" ");

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchResult(null);
    setLastSearchedIssue(query);

    try {
      const { data, error } = await supabase.functions.invoke("repair-search", {
        body: { vehicle: vehicleLabel, issue: query },
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          title: "Search Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (data?.success && data?.data) {
        setSearchResult(data.data);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (err) {
      console.error("Search error:", err);
      toast({
        title: "Search Failed",
        description: "Could not connect to the AI repair service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />

        {/* Decorative ember line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="relative z-10 w-full px-4 py-16">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider mb-4">
              <span className="text-foreground">Toretto's</span>{" "}
              <span className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]">Toolbox</span>
            </h1>
            <p className="font-condensed text-xl md:text-2xl text-muted-foreground tracking-wide uppercase">
              Your Ride. Your Rules. <span className="text-primary">AI-Powered Repairs.</span>
            </p>
          </motion.div>

          {/* Vehicle Selector */}
          <motion.div
            className="mb-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VehicleSelector vehicleData={vehicleData} />
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SearchBar
              isVehicleSelected={!!vehicleData.isVehicleSelected}
              vehicleLabel={vehicleLabel}
              onSearch={handleSearch}
              isSearching={isSearching}
            />
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {(isSearching || searchResult) && (
        <section className="py-10 px-4" ref={resultsRef}>
          <div className="container mx-auto">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-condensed text-muted-foreground uppercase tracking-wider">
                  Consulting the mechanic AI...
                </p>
              </div>
            ) : searchResult ? (
              <SearchResults
                vehicle={vehicleLabel}
                issue={lastSearchedIssue}
                result={searchResult}
              />
            ) : null}
          </div>
        </section>
      )}

      {/* Features Section */}
      {!searchResult && !isSearching && (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Wrench,
                  title: "AI Repair Guides",
                  desc: "Get step-by-step repair instructions powered by AI, tailored to your exact vehicle.",
                },
                {
                  icon: Flame,
                  title: "Community Insights",
                  desc: "Find forum discussions and peer advice from classic car enthusiasts with similar issues.",
                },
                {
                  icon: Gauge,
                  title: "Video Tutorials",
                  desc: "Watch relevant YouTube repair videos matched to your vehicle and concern.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors group"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                >
                  <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-xl font-bold uppercase mb-2">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
