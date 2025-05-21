import type React from "react"

import type { MuscleGroup } from "../types"

interface MuscleGroupFilterProps {
  selectedMuscleGroup: MuscleGroup
  onSelectMuscleGroup: (muscleGroup: MuscleGroup) => void
}

const muscleGroups: MuscleGroup[] = [
  "all",
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
]

const MuscleGroupFilter: React.FC<MuscleGroupFilterProps> = ({ selectedMuscleGroup, onSelectMuscleGroup }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Kas Grupları</h2>
      <div className="flex flex-wrap gap-2">
        {muscleGroups.map((group) => (
          <button
            key={group}
            onClick={() => onSelectMuscleGroup(group)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              selectedMuscleGroup === group
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MuscleGroupFilter
