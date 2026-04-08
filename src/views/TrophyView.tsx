import { useState, useCallback, useMemo } from "react";
import { allTrophySections } from "../trophyData";
import type { TrophyType } from "../trophyData";
import TrophyProgress from "../components/TrophyProgress";
import "./trophy-view.css";

const STORAGE_KEY = "tlou-trophies";

type EarnedState = Record<number, boolean>;

function loadEarned(): EarnedState {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") || {};
  } catch {
    return {};
  }
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

  const toggleSection = useCallback((i: number) => {
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));
  }, []);

  const allTrophies = useMemo(
    () => allTrophySections.flatMap((s) => s.trophies),
    [],
  );

  return (
    <div className="app trophy-app">
      <header className="header">
        <h1>The Last of Us</h1>
        <div className="subtitle">Trophy Guide</div>
      </header>

      <TrophyProgress trophies={allTrophies} earned={earned} />

      {allTrophySections.map((section, si) => {
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
