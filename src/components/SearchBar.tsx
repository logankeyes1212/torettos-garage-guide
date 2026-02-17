import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchBarProps {
  isVehicleSelected: boolean;
  vehicleLabel: string;
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

const SearchBar = ({ isVehicleSelected, vehicleLabel, onSearch, isSearching }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = () => {
    if (!isVehicleSelected) {
      toast({
        title: "Select Your Vehicle First",
        description: "Please choose your year, make, and model before searching.",
        variant: "destructive",
      });
      return;
    }
    if (!query.trim()) {
      toast({
        title: "Enter a Search Query",
        description: "Describe the issue you're having with your vehicle.",
        variant: "destructive",
      });
      return;
    }
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {isVehicleSelected && (
        <p className="text-sm text-muted-foreground mb-2 text-center font-condensed">
          Searching for: <span className="text-primary font-semibold">{vehicleLabel}</span>
        </p>
      )}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Describe your issue (e.g., engine knocking at idle)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-secondary border-border pl-4 pr-4 h-12 text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="h-12 px-6 bg-primary hover:bg-primary/80 text-primary-foreground font-heading uppercase tracking-wider"
        >
          <Search className="w-5 h-5 mr-2" />
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
