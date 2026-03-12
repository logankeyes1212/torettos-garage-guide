import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface SavedVehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  engine: string | null;
}

export const useSavedVehicles = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<SavedVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVehicles = async () => {
    if (!user) {
      setVehicles([]);
      return;
    }
    setIsLoading(true);
    const { data } = await supabase
      .from("user_vehicles")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setVehicles(data ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  const saveVehicle = async (vehicle: { year: string; make: string; model: string; engine: string }) => {
    if (!user) return;
    await supabase.from("user_vehicles").upsert(
      { user_id: user.id, year: vehicle.year, make: vehicle.make, model: vehicle.model, engine: vehicle.engine || null },
      { onConflict: "user_id,year,make,model,engine" }
    );
    await fetchVehicles();
  };

  const deleteVehicle = async (id: string) => {
    if (!user) return;
    await supabase.from("user_vehicles").delete().eq("id", id);
    await fetchVehicles();
  };

  return { vehicles, isLoading, saveVehicle, deleteVehicle, refetch: fetchVehicles };
};
