import { useSavedVehicles, SavedVehicle } from "@/hooks/useSavedVehicles";
import { Car, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Props {
  onSelect: (v: SavedVehicle) => void;
}

const SavedVehiclesDropdown = ({ onSelect }: Props) => {
  const { vehicles, isLoading, deleteVehicle } = useSavedVehicles();

  if (isLoading || vehicles.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-condensed uppercase tracking-wider text-sm gap-2 border-primary/30 hover:border-primary">
          <Car className="w-4 h-4" />
          My Garage
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-72">
        <DropdownMenuLabel className="font-condensed uppercase tracking-wider text-xs text-muted-foreground">
          Saved Vehicles
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {vehicles.map((v) => {
          const label = [v.year, v.make, v.model].filter(Boolean).join(" ");
          return (
            <DropdownMenuItem
              key={v.id}
              className="flex items-center justify-between cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                onSelect(v);
              }}
            >
              <span className="truncate font-condensed">{label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteVehicle(v.id);
                }}
                className="ml-2 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SavedVehiclesDropdown;
