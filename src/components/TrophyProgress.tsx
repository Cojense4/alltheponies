import { useMemo } from "react";
import type { Trophy, TrophyType } from "../trophyData";

interface TrophyProgressProps {
  trophies: Trophy[];
  earned: Record<number, boolean>;
}

const POINTS: Record<TrophyType, number> = {
  Platinum: 300,
  Gold: 90,
  Silver: 30,
  Bronze: 15,
};

const RARITY_ORDER: TrophyType[] = ["Platinum", "Gold", "Silver", "Bronze"];

function TrophyProgress({ trophies, earned }: TrophyProgressProps) {
  const stats = useMemo(() => {
    const counts: Record<TrophyType, { total: number; done: number }> = {
      Platinum: { total: 0, done: 0 },
      Gold: { total: 0, done: 0 },
      Silver: { total: 0, done: 0 },
      Bronze: { total: 0, done: 0 },
    };

    let totalPoints = 0;
    let earnedPoints = 0;

    for (const t of trophies) {
      counts[t.type].total++;
      totalPoints += POINTS[t.type];
      if (earned[t.id]) {
        counts[t.type].done++;
        earnedPoints += POINTS[t.type];
      }
    }

    const totalEarned = trophies.filter((t) => earned[t.id]).length;
    return {
      counts,
      totalPoints,
      earnedPoints,
      totalEarned,
      total: trophies.length,
    };
  }, [trophies, earned]);

  const pct = stats.total > 0 ? (stats.totalEarned / stats.total) * 100 : 0;

  return (
    <div className="trophy-progress">
      <div className="trophy-progress-header">
        <span className="trophy-progress-label">Trophy Progress</span>
        <span className="trophy-progress-points">
          {stats.earnedPoints} <span>/ {stats.totalPoints} pts</span>
        </span>
      </div>
      <div className="trophy-progress-bar-track">
        <div
          className="trophy-progress-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="trophy-progress-count">
        {stats.totalEarned} / {stats.total} trophies
      </div>
      <div className="trophy-rarity-breakdown">
        {RARITY_ORDER.map((rarity) => {
          const { total, done } = stats.counts[rarity];
          if (total === 0) return null;
          return (
            <div
              key={rarity}
              className={`rarity-item rarity-${rarity.toLowerCase()}`}
            >
              <span className="rarity-icon">{rarityIcon(rarity)}</span>
              <span className="rarity-label">{rarity}</span>
              <span className="rarity-count">
                {done} / {total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function rarityIcon(type: TrophyType): string {
  switch (type) {
    case "Platinum":
      return "💎";
    case "Gold":
      return "🏆";
    case "Silver":
      return "🥈";
    case "Bronze":
      return "🥉";
  }
}

export default TrophyProgress;
