import { useState } from "react";
import type { Trophy, TrophyType } from "../trophyData";
import "../styles/trophy-card.css";

interface TrophyCardProps {
  trophy: Trophy;
  earned: boolean;
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

function TrophyCard({ trophy, earned, onToggle }: TrophyCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((prev) => !prev);
  };

  return (
    <div
      className={`trophy-card ${earned ? "trophy-card--earned" : "trophy-card--locked"} ${flipped ? "trophy-card--flipped" : ""}`}
      onClick={() => {
        if (!flipped) onToggle(trophy.id);
      }}
    >
      <div className="trophy-card__inner">
        {/* ── Front Face ── */}
        <div className="trophy-card__front">
          <div className={`trophy-card__stripe ${RARITY_CLASS[trophy.type]}`} />

          <div className="trophy-card__check">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="2.5 6 5 8.5 9.5 3.5" />
            </svg>
          </div>

          <div className="trophy-card__header">
            <span className="trophy-card__icon">
              {RARITY_ICON[trophy.type]}
            </span>
            <span className={`trophy-card__badge ${RARITY_CLASS[trophy.type]}`}>
              {trophy.type}
            </span>
          </div>

          <h3 className="trophy-card__name">{trophy.name}</h3>
          <p className="trophy-card__desc">{trophy.description}</p>

          <div className="trophy-card__tags">
            {trophy.missable && (
              <span className="trophy-card__tag trophy-card__tag--missable">
                Missable
              </span>
            )}
            {trophy.onlineRequired && (
              <span className="trophy-card__tag trophy-card__tag--online">
                Online
              </span>
            )}
            {trophy.storyRelated && (
              <span className="trophy-card__tag trophy-card__tag--story">
                Story
              </span>
            )}
            {trophy.tags
              .filter(
                (t) =>
                  t !== "missable" && t !== "online" && t !== "story_related",
              )
              .map((tag) => (
                <span key={tag} className="trophy-card__tag">
                  {tag}
                </span>
              ))}
          </div>

          <button
            className="trophy-card__flip-btn"
            onClick={handleFlip}
            title="Show guide"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 8a6 6 0 0 1 10.3-4.15L14 2v4h-4l1.6-1.6A4.5 4.5 0 0 0 3.5 8" />
              <path d="M14 8a6 6 0 0 1-10.3 4.15L2 14v-4h4l-1.6 1.6A4.5 4.5 0 0 0 12.5 8" />
            </svg>
          </button>
        </div>

        {/* ── Back Face ── */}
        <div className="trophy-card__back">
          <div className={`trophy-card__stripe ${RARITY_CLASS[trophy.type]}`} />

          <div className="trophy-card__back-header">
            <h3 className="trophy-card__name">{trophy.name}</h3>
            <span className={`trophy-card__badge ${RARITY_CLASS[trophy.type]}`}>
              {trophy.type}
            </span>
          </div>

          {trophy.missable && (
            <div className="trophy-card__warning">⚠ Missable</div>
          )}

          <p className="trophy-card__guide">{trophy.guide}</p>

          <button
            className="trophy-card__flip-btn trophy-card__flip-btn--back"
            onClick={handleFlip}
            title="Back to front"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 8a6 6 0 0 1 10.3-4.15L14 2v4h-4l1.6-1.6A4.5 4.5 0 0 0 3.5 8" />
              <path d="M14 8a6 6 0 0 1-10.3 4.15L2 14v-4h4l-1.6 1.6A4.5 4.5 0 0 0 12.5 8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrophyCard;
