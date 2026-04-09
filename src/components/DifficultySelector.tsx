import { useCallback, useEffect, useState } from "react";

type Difficulty =
  | "easy"
  | "normal"
  | "hard"
  | "survivor"
  | "grounded"
  | "grounded-plus";

const STORAGE_KEY = "tlou-difficulty";

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "normal", label: "Normal" },
  { value: "hard", label: "Hard" },
  { value: "survivor", label: "Survivor" },
  { value: "grounded", label: "Grounded" },
  { value: "grounded-plus", label: "Grounded+" },
];

function loadDifficulty(): Difficulty {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && difficulties.some((d) => d.value === stored)) {
      return stored as Difficulty;
    }
  } catch {
    /* ignore */
  }
  return "normal";
}

function applyDifficulty(d: Difficulty) {
  const root = document.documentElement;
  if (d === "normal") {
    root.removeAttribute("data-difficulty");
  } else {
    root.setAttribute("data-difficulty", d);
  }
}

export default function DifficultySelector() {
  const [difficulty, setDifficulty] = useState<Difficulty>(loadDifficulty);

  useEffect(() => {
    applyDifficulty(difficulty);
  }, [difficulty]);

  const select = useCallback((d: Difficulty) => {
    setDifficulty(d);
    localStorage.setItem(STORAGE_KEY, d);
  }, []);

  return (
    <div className="difficulty-selector">
      <span className="difficulty-label">Difficulty</span>
      <div className="difficulty-options">
        {difficulties.map(({ value, label }) => (
          <button
            key={value}
            className={`difficulty-btn${difficulty === value ? " difficulty-btn--active" : ""}`}
            onClick={() => select(value)}
            aria-pressed={difficulty === value}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Apply on initial load (before React hydrates) so there's no flash
applyDifficulty(loadDifficulty());
