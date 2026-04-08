import { useState, useMemo, useCallback } from "react";
import guide from "../data";
import ResetDialog from "../components/ResetDialog";
import "./CollectiblesView.css";

const STORAGE_KEY = "tlou-checked";
const ALL_TAGS = [
  "ART",
  "FF",
  "CONV",
  "COMIC",
  "MAN",
  "SHIV",
  "TOOL",
  "JOKE",
] as const;
const TAG_LABELS: Record<string, string> = {
  ART: "Artifacts",
  FF: "Firefly Pendants",
  CONV: "Conversations",
  COMIC: "Comics",
  MAN: "Training Manuals",
  SHIV: "Shiv Doors",
  TOOL: "Tools",
  JOKE: "Ellie's Jokes",
};

type CheckedState = Record<string, boolean>;

function loadChecked(): CheckedState {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") || {};
  } catch {
    return {};
  }
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

function Chevron() {
  return (
    <span style={{ display: "inline-block", fontSize: "0.7rem" }}>&#9660;</span>
  );
}

function CollectiblesView() {
  const [checked, setChecked] = useState(loadChecked);
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>(
    () => {
      const initial: Record<number, boolean> = {};
      guide.forEach((_, i) => {
        initial[i] = true;
      });
      return initial;
    },
  );
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [showResetDialog, setShowResetDialog] = useState(false);

  const toggleFilter = useCallback((tag: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
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

  const toggleChapter = useCallback((i: number) => {
    setOpenChapters((prev) => ({ ...prev, [i]: !prev[i] }));
  }, []);

  const toggleSection = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !(prev[key] ?? true) }));
  }, []);

  const toggleSelectAll = useCallback(
    (items: { id: string }[], allChecked: boolean) => {
      setChecked((prev) => {
        const next = { ...prev };
        for (const item of items) {
          if (allChecked) {
            delete next[item.id];
          } else {
            next[item.id] = true;
          }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const resetAll = useCallback(() => {
    setChecked({});
    localStorage.removeItem(STORAGE_KEY);
    setShowResetDialog(false);
  }, []);

  const allItems = useMemo(() => {
    return guide.flatMap((ch) => ch.sections.flatMap((s) => s.items));
  }, []);

  const totalCount = allItems.length;
  const checkedCount = allItems.filter((item) => checked[item.id]).length;
  const pct = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div className="app">
      <header className="header">
        <h1>The Last of Us</h1>
        <div className="subtitle">Collectibles Tracker</div>
      </header>

      <div className="global-progress">
        <div className="global-progress-header">
          <span className="global-progress-label">Overall Progress</span>
          <span>
            <span className="global-progress-count">
              {checkedCount} <span>/ {totalCount}</span>
            </span>
            {checkedCount > 0 && (
              <button
                className="reset-btn"
                onClick={() => setShowResetDialog(true)}
              >
                Reset
              </button>
            )}
          </span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="tag-filters">
        <button
          className={`tag-filter-btn ${activeFilters.size === 0 ? "active" : ""}`}
          onClick={() => setActiveFilters(new Set())}
        >
          All
        </button>
        {ALL_TAGS.map((tag) => {
          const tagItems = allItems.filter((item) => item.tag === tag);
          const tagChecked = tagItems.filter((item) => checked[item.id]).length;
          return (
            <button
              key={tag}
              className={`tag-filter-btn ${activeFilters.has(tag) ? "active" : ""}`}
              onClick={() => toggleFilter(tag)}
            >
              {TAG_LABELS[tag]}{" "}
              <span className="tag-counter">
                {tagChecked}/{tagItems.length}
              </span>
            </button>
          );
        })}
      </div>

      {guide.map((chapter, ci) => {
        const chapterItems = chapter.sections.flatMap((s) => s.items);
        const filtered =
          activeFilters.size > 0
            ? chapterItems.filter((item) => activeFilters.has(item.tag))
            : chapterItems;
        if (filtered.length === 0) return null;

        const chapterChecked = filtered.filter(
          (item) => checked[item.id],
        ).length;
        const isOpen = openChapters[ci];

        return (
          <div className="chapter" key={ci}>
            <div className="chapter-header" onClick={() => toggleChapter(ci)}>
              <span className="chapter-title">{chapter.chapter}</span>
              <div className="chapter-meta">
                <span className="chapter-count">
                  <span className="done">{chapterChecked}</span> /{" "}
                  {filtered.length}
                </span>
                <span className={`chapter-toggle ${isOpen ? "open" : ""}`}>
                  <Chevron />
                </span>
              </div>
            </div>

            {isOpen && (
              <div className="chapter-body">
                <a
                  className="chapter-video"
                  href={chapter.video}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Video Guide &rarr;
                </a>
                {chapter.sections.map((section, si) => {
                  const sectionItems =
                    activeFilters.size > 0
                      ? section.items.filter((item) =>
                          activeFilters.has(item.tag),
                        )
                      : section.items;
                  if (sectionItems.length === 0) return null;

                  const sectionKey = `${ci}-${si}`;
                  const isSectionOpen = openSections[sectionKey] ?? true;
                  const sectionCheckedCount = sectionItems.filter(
                    (item) => checked[item.id],
                  ).length;
                  const allSectionChecked =
                    sectionItems.length > 0 &&
                    sectionCheckedCount === sectionItems.length;

                  return (
                    <div className="section" key={si}>
                      <div
                        className="section-header"
                        onClick={() => toggleSection(sectionKey)}
                      >
                        <div className="section-header-left">
                          <span
                            className={`section-toggle ${isSectionOpen ? "open" : ""}`}
                          >
                            <Chevron />
                          </span>
                          <span className="section-name">{section.name}</span>
                        </div>
                        <div className="section-meta">
                          <span className="section-count">
                            <span className="done">{sectionCheckedCount}</span>{" "}
                            / {sectionItems.length}
                          </span>
                          <div
                            className={`section-select-all ${allSectionChecked ? "checked" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelectAll(sectionItems, allSectionChecked);
                            }}
                          >
                            <Check />
                          </div>
                        </div>
                      </div>
                      {isSectionOpen &&
                        sectionItems.map((item) => (
                          <div
                            key={item.id}
                            className={`item ${checked[item.id] ? "checked" : ""}`}
                            onClick={() => toggle(item.id)}
                          >
                            <div className="item-checkbox">
                              <Check />
                            </div>
                            <div className="item-content">
                              <div className="item-top-row">
                                <span className={`tag tag-${item.tag}`}>
                                  {item.tag}
                                </span>
                                {item.name && (
                                  <span className="item-name">{item.name}</span>
                                )}
                              </div>
                              <div className="item-desc">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <ResetDialog
        open={showResetDialog}
        onConfirm={resetAll}
        onCancel={() => setShowResetDialog(false)}
      />

      <footer className="footer">
        <p>
          Guide by{" "}
          <a
            href="https://gamefaqs.gamespot.com/community/Kairi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kairi
          </a>{" "}
          &middot;{" "}
          <a
            href="https://gamefaqs.gamespot.com/ps3/652686-the-last-of-us/faqs/67225"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source on GameFAQs
          </a>
        </p>
      </footer>
    </div>
  );
}

export default CollectiblesView;
