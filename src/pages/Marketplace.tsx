import { motion } from "framer-motion";
import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Marketplace = () => {
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
            <Button className="font-heading uppercase tracking-wider">
              <Plus className="w-5 h-5 mr-2" /> Create Listing
            </Button>
          </div>

          {/* Placeholder for listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="rounded-lg bg-card border border-border p-6 hover:border-primary/40 transition-colors"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="h-48 bg-secondary rounded-md mb-4 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase mb-1">Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Marketplace listings will appear here. Sign in to create one.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
