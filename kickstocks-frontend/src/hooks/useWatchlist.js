import { useWatchlistContext } from "../context/WatchlistContext";

// Thin re-export so every consumer imports from the same hooks/ path they
// already know, and the context internals stay decoupled.
export function useWatchlist() {
  return useWatchlistContext();
}
