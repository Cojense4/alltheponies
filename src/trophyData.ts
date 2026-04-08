import trophyJson from "./TLOU_REMASTERED_TROPHIES.json";

// --- Types ---

export type TrophyType = "Platinum" | "Gold" | "Silver" | "Bronze";

export interface Trophy {
  id: number;
  name: string;
  type: TrophyType;
  description: string;
  missable: boolean;
  storyRelated: boolean;
  onlineRequired: boolean;
  tags: string[];
  guide: string;
}

export interface TrophySection {
  sectionName: string;
  dlcName?: string;
  trophyCount: {
    platinum?: number;
    gold?: number;
    silver?: number;
    bronze?: number;
  };
  estimatedDifficulty?: string;
  estimatedTime?: string;
  note?: string;
  trophies: Trophy[];
}

export interface RoadmapStage {
  stage: number;
  title: string;
  description: string;
  exploitNote?: string;
  trophiesAvailable: string[];
}

// --- Raw JSON shapes ---

interface RawTrophy {
  id: number;
  name: string;
  type: string;
  description: string;
  missable: boolean;
  story_related: boolean;
  online_required?: boolean;
  tags: string[];
  guide: string;
}

interface RawDlc {
  dlc_name: string;
  total_trophies: number;
  trophy_counts: Record<string, number>;
  estimated_difficulty?: string;
  estimated_time?: string;
  note?: string;
  trophies: RawTrophy[];
}

interface RawRoadmapStage {
  stage: number;
  title: string;
  description: string;
  exploit_note?: string;
  trophies_available?: string[];
}

// --- Mapping functions ---

function mapTrophy(raw: RawTrophy): Trophy {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type as TrophyType,
    description: raw.description,
    missable: raw.missable,
    storyRelated: raw.story_related,
    onlineRequired: raw.online_required ?? false,
    tags: raw.tags,
    guide: raw.guide,
  };
}

function mapDlcSection(raw: RawDlc): TrophySection {
  return {
    sectionName: raw.dlc_name,
    dlcName: raw.dlc_name,
    trophyCount: raw.trophy_counts,
    estimatedDifficulty: raw.estimated_difficulty,
    estimatedTime: raw.estimated_time,
    note: raw.note,
    trophies: raw.trophies.map(mapTrophy),
  };
}

function mapRoadmapStage(raw: RawRoadmapStage): RoadmapStage {
  return {
    stage: raw.stage,
    title: raw.title,
    description: raw.description,
    exploitNote: raw.exploit_note,
    trophiesAvailable: raw.trophies_available ?? [],
  };
}

// --- Build exports ---

const json = trophyJson as {
  overview: {
    total_trophies: number;
    trophy_counts: Record<string, number>;
    estimated_difficulty: string;
    estimated_time: string;
  };
  roadmap: {
    recommended_playthrough_order: RawRoadmapStage[];
    tips_and_strategies: string[];
  };
  base_game_trophies: RawTrophy[];
  dlc_left_behind: RawDlc;
  dlc_reclaimed_territories: RawDlc;
  dlc_abandoned_territories: RawDlc;
  dlc_grounded_mode: RawDlc;
  trophy_categories_summary: Record<string, string[]>;
};

const baseGameSection: TrophySection = {
  sectionName: "Base Game",
  trophyCount: json.overview.trophy_counts,
  estimatedDifficulty: json.overview.estimated_difficulty,
  estimatedTime: json.overview.estimated_time,
  trophies: json.base_game_trophies.map(mapTrophy),
};

export const allTrophySections: TrophySection[] = [
  baseGameSection,
  mapDlcSection(json.dlc_left_behind),
  mapDlcSection(json.dlc_reclaimed_territories),
  mapDlcSection(json.dlc_abandoned_territories),
  mapDlcSection(json.dlc_grounded_mode),
];

export const roadmapStages: RoadmapStage[] =
  json.roadmap.recommended_playthrough_order.map(mapRoadmapStage);

export const tipsAndStrategies: string[] = json.roadmap.tips_and_strategies;

export const categorySummaries: Record<string, string[]> =
  json.trophy_categories_summary;
