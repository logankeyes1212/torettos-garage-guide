import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface MarketplaceListing {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  vehicle_year: string | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  vehicle_engine: string | null;
  photo_url: string | null;
  status: "active" | "sold" | "deleted";
  created_at: string;
  updated_at: string;
}

export const useMarketplaceListings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("marketplace_listings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: "Failed to load listings", variant: "destructive" });
    } else {
      setListings((data as MarketplaceListing[]) ?? []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const createListing = async (listing: {
    title: string;
    description: string;
    vehicle_year?: string;
    vehicle_make?: string;
    vehicle_model?: string;
    vehicle_engine?: string;
    photo_url?: string;
  }) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("marketplace_listings")
      .insert({
        user_id: user.id,
        title: listing.title,
        description: listing.description,
        vehicle_year: listing.vehicle_year || null,
        vehicle_make: listing.vehicle_make || null,
        vehicle_model: listing.vehicle_model || null,
        vehicle_engine: listing.vehicle_engine || null,
        photo_url: listing.photo_url || null,
      })
      .select()
      .single();
    if (error) {
      toast({ title: "Error", description: "Failed to create listing", variant: "destructive" });
      return null;
    }
    await fetchListings();
    return data;
  };

  const updateListing = async (id: string, updates: Partial<{
    title: string;
    description: string;
    vehicle_year: string;
    vehicle_make: string;
    vehicle_model: string;
    vehicle_engine: string;
    photo_url: string;
    status: "active" | "sold" | "deleted";
  }>) => {
    const { error } = await supabase
      .from("marketplace_listings")
      .update(updates)
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update listing", variant: "destructive" });
      return false;
    }
    await fetchListings();
    return true;
  };

  const deleteListing = async (id: string) => {
    const { error } = await supabase
      .from("marketplace_listings")
      .delete()
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete listing", variant: "destructive" });
      return false;
    }
    await fetchListings();
    return true;
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    if (!user) return null;
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("listing-photos")
      .upload(path, file);
    if (error) {
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("listing-photos")
      .getPublicUrl(path);
    return urlData.publicUrl;
  };

  return { listings, isLoading, createListing, updateListing, deleteListing, uploadPhoto, refetch: fetchListings };
};
