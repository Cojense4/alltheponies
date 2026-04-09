import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import type { Trophy, TrophyType } from "../trophyData";
import { roadmapStages } from "../trophyData";
import "../styles/trophy-overlay.css";

interface TrophyOverlayProps {
  trophy: Trophy;
  earned: boolean;
  onClose: () => void;
  onToggle: (id: number) => void;
}

const RARITY_CLASS: Record<TrophyType, string> = {
  Platinum: "tc-rarity-platinum",
  Gold: "tc-rarity-gold",
  Silver: "tc-rarity-silver",
  Bronze: "tc-rarity-bronze",
};

const RARITY_ICON: Record<TrophyType, string> = {
  Platinum: "\uD83C\uDFC6",
  Gold: "\uD83E\uDD47",
  Silver: "\uD83E\uDD48",
  Bronze: "\uD83E\uDD49",
};

function TrophyOverlay({
  trophy,
  earned,
  onClose,
  onToggle,
}: TrophyOverlayProps) {
  const roadmapStage = useMemo(
    () =>
      roadmapStages.find((s) =>
        s.trophiesAvailable.some(
          (name) => name.toLowerCase() === trophy.name.toLowerCase(),
        ),
      ),
    [trophy.name],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="trophy-overlay" onClick={onClose}>
      <div
        className="trophy-overlay__card"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`trophy-overlay__stripe ${RARITY_CLASS[trophy.type]}`}
        />

        <button
          className="trophy-overlay__close"
          onClick={onClose}
          title="Close"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        <div className="trophy-overlay__header">
          <span className="trophy-overlay__icon">
            {RARITY_ICON[trophy.type]}
          </span>
          <div>
            <h2 className="trophy-overlay__name">{trophy.name}</h2>
            <span
              className={`trophy-overlay__badge ${RARITY_CLASS[trophy.type]}`}
            >
              {trophy.type}
            </span>
          </div>
        </div>

        <p className="trophy-overlay__desc">{trophy.description}</p>

        <div className="trophy-overlay__tags">
          {trophy.missable && (
            <span className="trophy-overlay__tag trophy-overlay__tag--missable">
              Missable
            </span>
          )}
          {trophy.onlineRequired && (
            <span className="trophy-overlay__tag trophy-overlay__tag--online">
              Online
            </span>
          )}
          {trophy.storyRelated && (
            <span className="trophy-overlay__tag trophy-overlay__tag--story">
              Story
            </span>
          )}
          {trophy.tags
            .filter(
              (t) =>
                t !== "missable" && t !== "online" && t !== "story_related",
            )
            .map((tag) => (
              <span key={tag} className="trophy-overlay__tag">
                {tag}
              </span>
            ))}
        </div>

        {roadmapStage && (
          <div className="trophy-overlay__section">
            <h3 className="trophy-overlay__section-title">Roadmap</h3>
            <div className="trophy-overlay__roadmap">
              <span className="trophy-overlay__roadmap-stage">
                Stage {roadmapStage.stage}
              </span>
              <span className="trophy-overlay__roadmap-title">
                {roadmapStage.title}
              </span>
            </div>
          </div>
        )}

        <div className="trophy-overlay__section">
          <h3 className="trophy-overlay__section-title">Guide</h3>
          {trophy.missable && (
            <div className="trophy-overlay__warning">
              ⚠ This trophy is missable
            </div>
          )}
          <p className="trophy-overlay__guide">{trophy.guide}</p>
        </div>

        <div className="trophy-overlay__actions">
          <button
            className={`trophy-overlay__earn-btn ${earned ? "trophy-overlay__earn-btn--earned" : ""}`}
            onClick={() => onToggle(trophy.id)}
          >
            {earned ? "✓ Earned" : "Mark as Earned"}
          </button>
          <button
            className="trophy-overlay__note-btn"
            disabled
            title="Coming soon"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default TrophyOverlay;
