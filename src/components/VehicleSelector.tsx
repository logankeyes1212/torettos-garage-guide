import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useVehicleData } from "@/hooks/useVehicleData";
import { Car, Calendar, Wrench, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface VehicleSelectorProps {
  vehicleData: ReturnType<typeof useVehicleData>;
}

const VehicleSelector = ({ vehicleData }: VehicleSelectorProps) => {
  const {
    years, year, setYear,
    makes, make, setMake,
    models, model, setModel,
    trims, trim, setTrim,
    loadingMakes, loadingModels,
  } = vehicleData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
      {/* Year */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-condensed font-semibold uppercase tracking-wider text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" /> Year
        </label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border max-h-60">
            {years.map((y) => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Make */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-condensed font-semibold uppercase tracking-wider text-muted-foreground">
          <Car className="w-4 h-4 text-primary" /> Manufacturer
        </label>
        {loadingMakes ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select value={make} onValueChange={setMake} disabled={!year}>
            <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors disabled:opacity-40">
              <SelectValue placeholder={year ? "Select Make" : "Select year first"} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border max-h-60">
              {makes.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Model */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-condensed font-semibold uppercase tracking-wider text-muted-foreground">
          <Wrench className="w-4 h-4 text-primary" /> Model
        </label>
        {loadingModels ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select value={model} onValueChange={setModel} disabled={!make}>
            <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors disabled:opacity-40">
              <SelectValue placeholder={make ? "Select Model" : "Select make first"} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border max-h-60">
              {models.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Trim */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-condensed font-semibold uppercase tracking-wider text-muted-foreground">
          <Tag className="w-4 h-4 text-primary" /> Trim
        </label>
        <Select value={trim} onValueChange={setTrim} disabled={!model}>
          <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors disabled:opacity-40">
            <SelectValue placeholder={model ? "Select Trim" : "Select model first"} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border max-h-60">
            {trims.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VehicleSelector;
