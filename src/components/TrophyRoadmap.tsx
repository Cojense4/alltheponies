import { useState, useCallback, useMemo } from "react";
import { roadmapStages, allTrophySections } from "../trophyData";
import type { RoadmapStage } from "../trophyData";
import "../styles/trophy-roadmap.css";

interface TrophyRoadmapProps {
  earned: Record<number, boolean>;
}

/** Build a map of trophy name → id for scroll linking */
function buildTrophyNameMap(): Map<string, number> {
  const map = new Map<string, number>();
  for (const section of allTrophySections) {
    for (const trophy of section.trophies) {
      map.set(trophy.name.toLowerCase(), trophy.id);
    }
  }
  return map;
}

function scrollToTrophy(trophyId: number) {
  const el = document.getElementById(`trophy-${trophyId}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("trophy-card--highlight");
    setTimeout(() => el.classList.remove("trophy-card--highlight"), 1500);
  }
}

function StageNode({
  stage,
  trophyNameMap,
  earned,
}: {
  stage: RoadmapStage;
  trophyNameMap: Map<string, number>;
  earned: Record<number, boolean>;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => setExpanded((p) => !p), []);

  const { earnedCount, totalCount } = useMemo(() => {
    let ec = 0;
    let tc = 0;
    for (const name of stage.trophiesAvailable) {
      const id = trophyNameMap.get(name.toLowerCase());
      if (id !== undefined) {
        tc++;
        if (earned[id]) ec++;
      }
    }
    return { earnedCount: ec, totalCount: tc };
  }, [stage.trophiesAvailable, trophyNameMap, earned]);

  const pct = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;
  const complete = totalCount > 0 && earnedCount === totalCount;

  return (
    <div
      className={`roadmap-stage ${expanded ? "roadmap-stage--expanded" : ""} ${complete ? "roadmap-stage--complete" : ""}`}
    >
      <button className="roadmap-stage__header" onClick={toggle}>
        <span
          className={`roadmap-stage__number ${complete ? "roadmap-stage__number--done" : ""}`}
        >
          {complete ? "✓" : stage.stage}
        </span>
        <div className="roadmap-stage__info">
          <span className="roadmap-stage__title">{stage.title}</span>
          {totalCount > 0 && (
            <span className="roadmap-stage__progress">
              {earnedCount}/{totalCount} &middot; {pct}%
            </span>
          )}
          {totalCount === 0 && (
            <span className="roadmap-stage__progress roadmap-stage__progress--optional">
              Optional
            </span>
          )}
        </div>
        <span
          className={`roadmap-stage__chevron ${expanded ? "roadmap-stage__chevron--open" : ""}`}
        >
          &#9660;
        </span>
      </button>

      {expanded && (
        <div className="roadmap-stage__body">
          <p className="roadmap-stage__desc">{stage.description}</p>

          {stage.exploitNote && (
            <div className="roadmap-stage__exploit">
              <span className="roadmap-stage__exploit-label">Exploit Tip</span>
              <p>{stage.exploitNote}</p>
            </div>
          )}

          {totalCount > 0 && (
            <div className="roadmap-stage__trophies">
              <div className="roadmap-stage__trophies-label">
                Trophies ({earnedCount}/{totalCount})
              </div>
              <div className="roadmap-stage__trophy-bar-track">
                <div
                  className="roadmap-stage__trophy-bar-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <ul className="roadmap-stage__trophy-list">
                {stage.trophiesAvailable.map((name) => {
                  const id = trophyNameMap.get(name.toLowerCase());
                  const isEarned = id !== undefined && earned[id];
                  return (
                    <li
                      key={name}
                      className={`roadmap-trophy-link ${isEarned ? "roadmap-trophy-link--earned" : ""}`}
                    >
                      <button
                        className="roadmap-trophy-link__btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (id !== undefined) scrollToTrophy(id);
                        }}
                        disabled={id === undefined}
                      >
                        <span className="roadmap-trophy-link__check">
                          {isEarned ? "✓" : "○"}
                        </span>
                        {name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TrophyRoadmap({ earned }: TrophyRoadmapProps) {
  const trophyNameMap = useMemo(() => buildTrophyNameMap(), []);

  return (
    <div className="trophy-roadmap">
      <h2 className="trophy-roadmap__title">Roadmap</h2>
      <div className="trophy-roadmap__timeline">
        {roadmapStages.map((stage) => (
          <StageNode
            key={stage.stage}
            stage={stage}
            trophyNameMap={trophyNameMap}
            earned={earned}
          />
        ))}
      </div>
    </div>
  );
}

export default TrophyRoadmap;
