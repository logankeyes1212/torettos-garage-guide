import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, MessageSquare, Youtube, AlertTriangle, ChevronDown, ChevronUp, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RepairGuideObject {
  steps?: string[];
  toolsNeeded?: string[];
  safetyWarnings?: string[];
  [key: string]: unknown;
}

interface PartListing {
  retailer: string;
  url: string;
  price: string;
  type: "OEM" | "Aftermarket";
  brand?: string;
}

interface Part {
  name: string;
  listings: PartListing[];
}

interface RepairResult {
  repairGuide: string | RepairGuideObject;
  commonCauses: string[];
  estimatedDifficulty: string;
  forumDiscussions: { title: string; summary: string; community: string }[];
  youtubeSearches: string[];
  partsNeeded: string[];
  parts?: Part[];
}

interface SearchResultsProps {
  vehicle: string;
  issue: string;
  result: RepairResult;
}

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-900/50 text-green-400 border-green-700",
  Intermediate: "bg-yellow-900/50 text-yellow-400 border-yellow-700",
  Advanced: "bg-orange-900/50 text-orange-400 border-orange-700",
  "Professional Only": "bg-red-900/50 text-red-400 border-red-700",
};

// Safely render the repair guide — AI may return a string or a structured object
const renderRepairGuide = (guide: string | RepairGuideObject) => {
  if (!guide) return null;

  if (typeof guide === "string") {
    return <p className="whitespace-pre-wrap">{guide}</p>;
  }

  return (
    <div className="space-y-4">
      {Array.isArray(guide.safetyWarnings) && guide.safetyWarnings.length > 0 && (
        <div>
          <p className="font-semibold text-destructive mb-1 uppercase text-sm tracking-wide">⚠ Safety Warnings</p>
          <ul className="list-disc list-inside space-y-1">
            {guide.safetyWarnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
      {Array.isArray(guide.toolsNeeded) && guide.toolsNeeded.length > 0 && (
        <div>
          <p className="font-semibold text-foreground mb-1 uppercase text-sm tracking-wide">Tools Needed</p>
          <ul className="list-disc list-inside space-y-1">
            {guide.toolsNeeded.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}
      {Array.isArray(guide.steps) && guide.steps.length > 0 && (
        <div>
          <p className="font-semibold text-foreground mb-2 uppercase text-sm tracking-wide">Steps</p>
          <ol className="list-decimal list-inside space-y-2">
            {guide.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      )}
      {Object.entries(guide)
        .filter(([k, v]) => !["steps", "toolsNeeded", "safetyWarnings"].includes(k) && typeof v === "string")
        .map(([k, v]) => (
          <div key={k}>
            <p className="font-semibold text-foreground mb-1 uppercase text-sm tracking-wide">{k}</p>
            <p>{v as string}</p>
          </div>
        ))}
    </div>
  );
};

const SearchResults = ({ vehicle, issue, result }: SearchResultsProps) => {
  const [guideExpanded, setGuideExpanded] = useState(true);

  const diffClass = difficultyColor[result.estimatedDifficulty] ?? "bg-secondary text-muted-foreground border-border";

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-10 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h2 className="font-heading text-2xl uppercase text-foreground">
          Repair Results
        </h2>
        <span className="text-muted-foreground font-condensed">—</span>
        <span className="text-primary font-condensed font-semibold">{vehicle}</span>
        <Badge className={`border ${diffClass} font-condensed`}>
          {result.estimatedDifficulty}
        </Badge>
      </div>
      <p className="text-muted-foreground font-condensed italic">"{issue}"</p>

      {/* Common Causes */}
      {result.commonCauses?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-lg uppercase tracking-wide">Likely Causes</h3>
          </div>
          <ul className="space-y-2">
            {result.commonCauses.map((cause, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary font-bold mt-0.5">{i + 1}.</span>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Repair Guide */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <button
          className="w-full flex items-center justify-between gap-2 p-5 hover:bg-secondary/50 transition-colors"
          onClick={() => setGuideExpanded((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-lg uppercase tracking-wide">Toretto's Repair Guide</h3>
          </div>
          {guideExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {guideExpanded && (
            <motion.div
              key="guide"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border pt-4 space-y-3">
                {renderRepairGuide(result.repairGuide)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Parts — structured OEM/Aftermarket */}
      {result.parts && result.parts.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-lg uppercase tracking-wide">Parts You May Need</h3>
          </div>
          <div className="space-y-5">
            {result.parts.map((part, i) => {
              const oemListings = part.listings?.filter(l => l.type === "OEM") ?? [];
              const aftermarketListings = part.listings?.filter(l => l.type === "Aftermarket") ?? [];
              return (
                <div key={i} className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-secondary/60 px-4 py-2 border-b border-border">
                    <p className="font-heading uppercase tracking-wide text-foreground">{part.name}</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {oemListings.length > 0 && (
                      <div>
                        <p className="text-xs font-condensed uppercase tracking-widest text-primary mb-2">OEM / Dealer</p>
                        <div className="space-y-1">
                          {oemListings.map((l, j) => (
                            <a
                              key={j}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 px-3 py-2 bg-secondary/30 border border-border rounded hover:border-primary/50 hover:bg-secondary transition-colors group"
                            >
                              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-condensed">{l.retailer}{l.brand ? ` — ${l.brand}` : ""}</span>
                              <span className="text-sm font-bold text-primary shrink-0">{l.price}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    {aftermarketListings.length > 0 && (
                      <div>
                        <p className="text-xs font-condensed uppercase tracking-widest text-muted-foreground mb-2">Aftermarket</p>
                        <div className="space-y-1">
                          {aftermarketListings.map((l, j) => (
                            <a
                              key={j}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 px-3 py-2 bg-secondary/30 border border-border rounded hover:border-primary/50 hover:bg-secondary transition-colors group"
                            >
                              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-condensed">{l.retailer}{l.brand ? ` — ${l.brand}` : ""}</span>
                              <span className="text-sm font-bold text-foreground shrink-0">{l.price}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fallback plain parts list if structured parts not available */}
      {(!result.parts || result.parts.length === 0) && result.partsNeeded?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-lg uppercase tracking-wide">Parts You May Need</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.partsNeeded.map((part, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-secondary border border-border rounded-full text-sm text-muted-foreground font-condensed"
              >
                {part}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Forum Discussions */}
      {result.forumDiscussions?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-lg uppercase tracking-wide">Community Discussions</h3>
          </div>
          <div className="space-y-4">
            {result.forumDiscussions.map((d, i) => (
              <div key={i} className="border border-border rounded-lg p-4 bg-secondary/30">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-foreground text-sm">{d.title}</p>
                  <span className="text-xs text-primary font-condensed whitespace-nowrap border border-primary/30 rounded px-2 py-0.5">
                    {d.community}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{d.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* YouTube Searches */}
      {result.youtubeSearches?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Youtube className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-lg uppercase tracking-wide">Watch & Learn</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-3 font-condensed">
            Search these on YouTube for step-by-step video tutorials:
          </p>
          <div className="space-y-2">
            {result.youtubeSearches.map((q, i) => (
              <a
                key={i}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-secondary/50 border border-border rounded-lg hover:border-primary/50 hover:bg-secondary transition-colors group"
              >
                <Youtube className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{q}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SearchResults;
