import type { Trophy } from "../trophyData";

/** Check if a trophy matches a given tag filter key */
export function trophyMatchesTag(trophy: Trophy, tagKey: string): boolean {
  switch (tagKey) {
    case "missable":
      return trophy.missable;
    case "online":
      return trophy.onlineRequired;
    case "story":
      return trophy.storyRelated;
    case "collectible":
      return trophy.tags.includes("collectable");
    case "buggy":
      return trophy.tags.includes("buggy");
    default:
      return false;
  }
}
