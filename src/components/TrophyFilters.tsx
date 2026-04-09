import type { Trophy } from "../trophyData";
import { trophyMatchesTag } from "../utils/trophyFilters";

interface DlcToggle {
  key: string;
  label: string;
  enabled: boolean;
}

interface TrophyFiltersProps {
  dlcToggles: DlcToggle[];
  onToggle: (key: string) => void;
  activeTags: Set<string>;
  onTagToggle: (tag: string) => void;
  onTagClear: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  visibleTrophies: Trophy[];
  matchCount: number;
}

const TAG_FILTERS = [
  { key: "missable", label: "Missable" },
  { key: "online", label: "Online" },
  { key: "story", label: "Story" },
  { key: "collectible", label: "Collectible" },
  { key: "buggy", label: "Buggy" },
] as const;

function TrophyFilters({
  dlcToggles,
  onToggle,
  activeTags,
  onTagToggle,
  onTagClear,
  searchQuery,
  onSearchChange,
  visibleTrophies,
  matchCount,
}: TrophyFiltersProps) {
  const hasActiveFilters = activeTags.size > 0 || searchQuery.length > 0;

  return (
    <div className="trophy-filters-container">
      {/* DLC toggles */}
      <div className="trophy-dlc-filters">
        <span className="trophy-dlc-filters-label">DLC Packs</span>
        <div className="trophy-dlc-toggles">
          {dlcToggles.map((dlc) => (
            <button
              key={dlc.key}
              className={`trophy-dlc-toggle ${dlc.enabled ? "active" : ""}`}
              onClick={() => onToggle(dlc.key)}
              type="button"
            >
              <span className="trophy-dlc-toggle-indicator" />
              {dlc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tag filters */}
      <div className="trophy-tag-filters">
        <span className="trophy-tag-filters-label">Filter</span>
        <div className="trophy-tag-filter-buttons">
          <button
            className={`trophy-tag-filter-btn ${activeTags.size === 0 ? "active" : ""}`}
            onClick={onTagClear}
            type="button"
          >
            All
          </button>
          {TAG_FILTERS.map((tf) => {
            const count = visibleTrophies.filter((t) =>
              trophyMatchesTag(t, tf.key),
            ).length;
            return (
              <button
                key={tf.key}
                className={`trophy-tag-filter-btn ${activeTags.has(tf.key) ? "active" : ""}`}
                onClick={() => onTagToggle(tf.key)}
                type="button"
              >
                {tf.label}
                <span className="trophy-tag-filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="trophy-search">
        <input
          type="text"
          className="trophy-search-input"
          placeholder="Search trophies by name or tag…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="trophy-search-clear"
            onClick={() => onSearchChange("")}
            type="button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Result count */}
      {hasActiveFilters && (
        <div className="trophy-filter-result-count">
          {matchCount} {matchCount === 1 ? "trophy" : "trophies"} found
        </div>
      )}
    </div>
  );
}

export default TrophyFilters;
