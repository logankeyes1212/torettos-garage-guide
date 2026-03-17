import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import VehicleSelector from "@/components/VehicleSelector";
import { useVehicleData } from "@/hooks/useVehicleData";
import { useMarketplaceListings } from "@/hooks/useMarketplaceListings";
import { Plus, Upload, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface CreateListingDialogProps {
  onCreated?: () => void;
}

const CreateListingDialog = ({ onCreated }: CreateListingDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createListing, uploadPhoto } = useMarketplaceListings();
  const vehicleData = useVehicleData();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({ title: "Missing Title", description: "Please enter a listing title.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    let photoUrl: string | undefined;
    if (photoFile) {
      const url = await uploadPhoto(photoFile);
      if (url) photoUrl = url;
    }
    await createListing({
      title: title.trim(),
      description: description.trim(),
      vehicle_year: vehicleData.year || undefined,
      vehicle_make: vehicleData.make || undefined,
      vehicle_model: vehicleData.model || undefined,
      vehicle_engine: vehicleData.engine || undefined,
      photo_url: photoUrl,
    });
    setIsSubmitting(false);
    setOpen(false);
    setTitle("");
    setDescription("");
    setPhotoFile(null);
    setPhotoPreview(null);
    toast({ title: "Listing Created", description: "Your listing is now live!" });
    onCreated?.();
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-heading uppercase tracking-wider">
          <Plus className="w-5 h-5 mr-2" /> Create Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl uppercase tracking-wider">Create Listing</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="font-condensed uppercase tracking-wider text-sm">Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. 1969 Camaro SS Fender" />
          </div>
          <div className="space-y-2">
            <Label className="font-condensed uppercase tracking-wider text-sm">Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the item, condition, price..." rows={4} />
          </div>
          <div className="space-y-2">
            <Label className="font-condensed uppercase tracking-wider text-sm">Vehicle (optional)</Label>
            <VehicleSelector vehicleData={vehicleData} />
          </div>
          <div className="space-y-2">
            <Label className="font-condensed uppercase tracking-wider text-sm">Photo</Label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-secondary hover:bg-secondary/80 transition-colors text-sm">
                <Upload className="w-4 h-4" />
                Choose Photo
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="w-20 h-20 object-cover rounded-md border border-border" />
              )}
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full font-heading uppercase tracking-wider">
            {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
            {isSubmitting ? "Creating..." : "Create Listing"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListingDialog;
