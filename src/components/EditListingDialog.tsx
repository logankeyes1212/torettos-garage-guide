import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMarketplaceListings, MarketplaceListing } from "@/hooks/useMarketplaceListings";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditListingDialogProps {
  listing: MarketplaceListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated?: () => void;
}

const EditListingDialog = ({ listing, open, onOpenChange, onUpdated }: EditListingDialogProps) => {
  const { toast } = useToast();
  const { updateListing } = useMarketplaceListings();
  const [title, setTitle] = useState(listing.title);
  const [description, setDescription] = useState(listing.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setIsSubmitting(true);
    const ok = await updateListing(listing.id, {
      title: title.trim(),
      description: description.trim(),
    });
    setIsSubmitting(false);
    if (ok) {
      toast({ title: "Updated", description: "Listing updated successfully." });
      onOpenChange(false);
      onUpdated?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl uppercase tracking-wider">Edit Listing</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="font-condensed uppercase tracking-wider text-sm">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label className="font-condensed uppercase tracking-wider text-sm">Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full font-heading uppercase tracking-wider">
            {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;
