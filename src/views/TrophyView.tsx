import { useState, useCallback, useMemo } from "react";
import { allTrophySections } from "../trophyData";
import type { Trophy, TrophyType } from "../trophyData";
import TrophyProgress from "../components/TrophyProgress";
import TrophyFilters from "../components/TrophyFilters";
import { trophyMatchesTag } from "../utils/trophyFilters";
import "./trophy-view.css";

const STORAGE_KEY = "tlou-trophies";
const DLC_STORAGE_KEY = "tlou-dlc-toggles";

type EarnedState = Record<number, boolean>;

/** DLC section keys mapped by dlcName */
const DLC_SECTIONS = [
  { key: "left-behind", label: "Left Behind", dlcName: "Left Behind" },
  {
    key: "reclaimed",
    label: "Reclaimed Territories",
    dlcName: "Reclaimed Territories",
  },
  {
    key: "abandoned",
    label: "Abandoned Territories",
    dlcName: "Abandoned Territories",
  },
  { key: "grounded", label: "Grounded Mode", dlcName: "Grounded Mode" },
];

const DEFAULT_DLC_STATE: Record<string, boolean> = {
  "left-behind": true,
  reclaimed: false,
  abandoned: false,
  grounded: false,
};

function loadEarned(): EarnedState {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") || {};
  } catch {
    return {};
  }
}

function loadDlcToggles(): Record<string, boolean> {
  try {
    const stored = localStorage.getItem(DLC_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, boolean>;
      // Ensure all keys exist (in case new DLCs added)
      return { ...DEFAULT_DLC_STATE, ...parsed };
    }
  } catch {
    // fall through
  }
  return { ...DEFAULT_DLC_STATE };
}

function Chevron() {
  return (
    <span style={{ display: "inline-block", fontSize: "0.7rem" }}>&#9660;</span>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="#0a0b0a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="2.5 6 5 8.5 9.5 3.5" />
    </svg>
  );
}

const RARITY_CLASS: Record<TrophyType, string> = {
  Platinum: "rarity-platinum",
  Gold: "rarity-gold",
  Silver: "rarity-silver",
  Bronze: "rarity-bronze",
};

function TrophyView() {
  const [earned, setEarned] = useState(loadEarned);
  const [dlcEnabled, setDlcEnabled] = useState(loadDlcToggles);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<Record<number, boolean>>(
    () => {
      const initial: Record<number, boolean> = {};
      allTrophySections.forEach((_, i) => {
        initial[i] = true;
      });
      return initial;
    },
  );

  const toggleEarned = useCallback((id: number) => {
    setEarned((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleDlc = useCallback((key: string) => {
    setDlcEnabled((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(DLC_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleSection = useCallback((i: number) => {
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }, []);

  const clearTags = useCallback(() => {
    setActiveTags(new Set());
  }, []);

  /** Build set of hidden DLC names for filtering */
  const hiddenDlcNames = useMemo(() => {
    const hidden = new Set<string>();
    for (const dlc of DLC_SECTIONS) {
      if (!dlcEnabled[dlc.key]) {
        hidden.add(dlc.dlcName);
      }
    }
    return hidden;
  }, [dlcEnabled]);

  /** Sections visible after DLC toggle filtering */
  const visibleSections = useMemo(
    () =>
      allTrophySections.filter(
        (s) => !s.dlcName || !hiddenDlcNames.has(s.dlcName),
      ),
    [hiddenDlcNames],
  );

  /** All trophies from visible sections only — used for progress */
  const visibleTrophies = useMemo(
    () => visibleSections.flatMap((s) => s.trophies),
    [visibleSections],
  );

  /** Filter a trophy against active tags and search query */
  const trophyMatchesFilters = useCallback(
    (trophy: Trophy): boolean => {
      // Tag filter: trophy must match at least one active tag
      if (activeTags.size > 0) {
        let matchesAnyTag = false;
        for (const tag of activeTags) {
          if (trophyMatchesTag(trophy, tag)) {
            matchesAnyTag = true;
            break;
          }
        }
        if (!matchesAnyTag) return false;
      }

      // Text search: match against name and tags only
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const nameMatch = trophy.name.toLowerCase().includes(q);
        const tagMatch = trophy.tags.some((t) => t.toLowerCase().includes(q));
        if (!nameMatch && !tagMatch) return false;
      }

      return true;
    },
    [activeTags, searchQuery],
  );

  /** Sections with filtered trophies (only sections that have matches) */
  const filteredSections = useMemo(() => {
    const hasFilters = activeTags.size > 0 || searchQuery.trim().length > 0;
    if (!hasFilters) return visibleSections;
    return visibleSections
      .map((section) => ({
        ...section,
        trophies: section.trophies.filter(trophyMatchesFilters),
      }))
      .filter((section) => section.trophies.length > 0);
  }, [visibleSections, activeTags, searchQuery, trophyMatchesFilters]);

  /** Total match count for display */
  const matchCount = useMemo(
    () => filteredSections.reduce((sum, s) => sum + s.trophies.length, 0),
    [filteredSections],
  );

  const dlcToggles = DLC_SECTIONS.map((dlc) => ({
    key: dlc.key,
    label: dlc.label,
    enabled: dlcEnabled[dlc.key],
  }));

  return (
    <div className="app trophy-app">
      <header className="header">
        <h1>The Last of Us</h1>
        <div className="subtitle">Trophy Guide</div>
      </header>

      <TrophyProgress trophies={visibleTrophies} earned={earned} />
      <TrophyFilters
        dlcToggles={dlcToggles}
        onToggle={toggleDlc}
        activeTags={activeTags}
        onTagToggle={toggleTag}
        onTagClear={clearTags}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        visibleTrophies={visibleTrophies}
        matchCount={matchCount}
      />

      {filteredSections.map((section) => {
        const si = allTrophySections.indexOf(section);
        const sectionEarned = section.trophies.filter(
          (t) => earned[t.id],
        ).length;
        const isOpen = openSections[si];

        return (
          <div className="trophy-section" key={si}>
            <div
              className="trophy-section-header"
              onClick={() => toggleSection(si)}
            >
              <div className="trophy-section-title-area">
                <span className="trophy-section-title">
                  {section.sectionName}
                </span>
                {section.dlcName && (
                  <span className="trophy-section-dlc-badge">DLC</span>
                )}
                {section.estimatedDifficulty && (
                  <span className="trophy-section-meta-tag">
                    {section.estimatedDifficulty}
                  </span>
                )}
              </div>
              <div className="trophy-section-meta">
                <span className="trophy-section-count">
                  <span className="done">{sectionEarned}</span> /{" "}
                  {section.trophies.length}
                </span>
                <span className={`chapter-toggle ${isOpen ? "open" : ""}`}>
                  <Chevron />
                </span>
              </div>
            </div>

            {isOpen && (
              <div className="trophy-section-body">
                {section.note && (
                  <div className="trophy-section-note">{section.note}</div>
                )}
                {section.trophies.map((trophy) => {
                  const isEarned = !!earned[trophy.id];
                  return (
                    <div
                      key={trophy.id}
                      className={`trophy-item ${isEarned ? "earned" : ""}`}
                      onClick={() => toggleEarned(trophy.id)}
                    >
                      <div className="trophy-item-checkbox">
                        <Check />
                      </div>
                      <div className="trophy-item-content">
                        <div className="trophy-item-top-row">
                          <span
                            className={`trophy-rarity-badge ${RARITY_CLASS[trophy.type]}`}
                          >
                            {trophy.type}
                          </span>
                          <span className="trophy-item-name">
                            {trophy.name}
                          </span>
                        </div>
                        <div className="trophy-item-desc">
                          {trophy.description}
                        </div>
                        <div className="trophy-item-tags">
                          {trophy.missable && (
                            <span className="trophy-tag trophy-tag-missable">
                              Missable
                            </span>
                          )}
                          {trophy.onlineRequired && (
                            <span className="trophy-tag trophy-tag-online">
                              Online
                            </span>
                          )}
                          {trophy.storyRelated && (
                            <span className="trophy-tag trophy-tag-story">
                              Story
                            </span>
                          )}
                          {trophy.tags
                            .filter(
                              (t) =>
                                t !== "missable" &&
                                t !== "online" &&
                                t !== "story_related",
                            )
                            .map((tag) => (
                              <span key={tag} className="trophy-tag">
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <footer className="footer">
        <p>
          Data from{" "}
          <a
            href="https://www.playstationtrophies.org/game/the-last-of-us-remastered/guide/"
            target="_blank"
            rel="noopener noreferrer"
          >
            playstationtrophies.org
          </a>{" "}
          &middot;{" "}
          <a
            href="https://psnprofiles.com/guide/6004-the-last-of-us-remastered-trophy-guide"
            target="_blank"
            rel="noopener noreferrer"
          >
            psnprofiles.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default TrophyView;
