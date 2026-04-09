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
  return (
    <div
      className={`trophy-card ${earned ? "trophy-card--earned" : "trophy-card--locked"}`}
      onClick={() => onToggle(trophy.id)}
    >
      <div className="trophy-card__inner">
        {/* Rarity stripe */}
        <div className={`trophy-card__stripe ${RARITY_CLASS[trophy.type]}`} />

        {/* Checkbox */}
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

        {/* Header: icon + rarity badge */}
        <div className="trophy-card__header">
          <span className="trophy-card__icon">{RARITY_ICON[trophy.type]}</span>
          <span className={`trophy-card__badge ${RARITY_CLASS[trophy.type]}`}>
            {trophy.type}
          </span>
        </div>

        {/* Name */}
        <h3 className="trophy-card__name">{trophy.name}</h3>

        {/* Description */}
        <p className="trophy-card__desc">{trophy.description}</p>

        {/* Tags */}
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
      </div>
    </div>
  );
}

export default TrophyCard;
