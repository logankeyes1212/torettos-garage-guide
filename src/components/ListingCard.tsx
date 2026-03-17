import { useState } from "react";
import { motion } from "framer-motion";
import { MarketplaceListing, useMarketplaceListings } from "@/hooks/useMarketplaceListings";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingBag, Edit, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EditListingDialog from "@/components/EditListingDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface ListingCardProps {
  listing: MarketplaceListing;
  index: number;
  onUpdated: () => void;
}

const ListingCard = ({ listing, index, onUpdated }: ListingCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { updateListing, deleteListing } = useMarketplaceListings();
  const [editOpen, setEditOpen] = useState(false);
  const isOwner = user?.id === listing.user_id;

  const vehicleLabel = [listing.vehicle_year, listing.vehicle_make, listing.vehicle_model]
    .filter(Boolean)
    .join(" ");

  const handleMarkSold = async () => {
    const ok = await updateListing(listing.id, { status: "sold" as const });
    if (ok) {
      toast({ title: "Marked as Sold", description: "Listing has been ended." });
      onUpdated();
    }
  };

  const handleDelete = async () => {
    const ok = await deleteListing(listing.id);
    if (ok) {
      toast({ title: "Deleted", description: "Listing removed." });
      onUpdated();
    }
  };

  return (
    <>
      <motion.div
        className="rounded-lg bg-card border border-border overflow-hidden hover:border-primary/40 transition-colors group"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.05 }}
      >
        {/* Photo */}
        <div className="h-48 bg-secondary flex items-center justify-center relative">
          {listing.photo_url ? (
            <img src={listing.photo_url} alt={listing.title} className="w-full h-full object-cover" />
          ) : (
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
          )}
          {listing.status === "sold" && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg font-heading uppercase px-4 py-1">Sold</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading text-lg font-bold uppercase mb-1 line-clamp-1">{listing.title}</h3>
          {vehicleLabel && (
            <p className="text-xs text-primary font-condensed uppercase tracking-wide mb-1">{vehicleLabel}</p>
          )}
          {listing.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{listing.description}</p>
          )}

          {/* Owner actions */}
          {isOwner && listing.status === "active" && (
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
                <Edit className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleMarkSold}>
                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Sold
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete listing?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </motion.div>

      {isOwner && (
        <EditListingDialog
          listing={listing}
          open={editOpen}
          onOpenChange={setEditOpen}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
};

export default ListingCard;
