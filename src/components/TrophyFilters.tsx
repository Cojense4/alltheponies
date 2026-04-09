interface DlcToggle {
  key: string;
  label: string;
  enabled: boolean;
}

interface TrophyFiltersProps {
  dlcToggles: DlcToggle[];
  onToggle: (key: string) => void;
}

function TrophyFilters({ dlcToggles, onToggle }: TrophyFiltersProps) {
  return (
    <div className="trophy-dlc-filters">
      <span className="trophy-dlc-filters-label">DLC Packs</span>
      <div className="trophy-dlc-toggles">
        {dlcToggles.map((dlc) => (
          <button
            key={dlc.key}
            className={`trophy-dlc-toggle ${dlc.enabled ? "active" : ""}`}
            onClick={() => onToggle(dlc.key)}
            type="button"
          >
            <span className="trophy-dlc-toggle-indicator" />
            {dlc.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TrophyFilters;
