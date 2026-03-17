import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useMarketplaceListings } from "@/hooks/useMarketplaceListings";
import CreateListingDialog from "@/components/CreateListingDialog";
import ListingCard from "@/components/ListingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Marketplace = () => {
  const { user } = useAuth();
  const { listings, isLoading, refetch } = useMarketplaceListings();

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4">
              <ShoppingBag className="inline w-10 h-10 text-primary mr-3" />
              Marketplace
            </h1>
            <p className="text-muted-foreground font-condensed text-lg uppercase tracking-wide">
              Buy & sell classic car parts and vehicles
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            {user ? (
              <CreateListingDialog onCreated={refetch} />
            ) : (
              <Link to="/auth">
                <Button className="font-heading uppercase tracking-wider">
                  Sign In to Create Listing
                </Button>
              </Link>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-72 rounded-lg" />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground font-condensed uppercase tracking-wide">
                No listings yet. Be the first to create one!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} onUpdated={refetch} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
