import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getExercisesByBodyPart, searchExercises } from "../services/exerciseService"
import type { MuscleGroup } from "../types"
import ExerciseList from "../components/ExerciseList"
import FavoritesList from "../components/FavoritesList"
import MuscleGroupFilter from "../components/MuscleGroupFilter"
import SearchForm from "../components/SearchForm"

const Home = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: exercises,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercises", selectedMuscleGroup, searchQuery],
    queryFn: () => {
      if (searchQuery) {
        return searchExercises(searchQuery)
      }
      return getExercisesByBodyPart(selectedMuscleGroup)
    },
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSelectMuscleGroup = (muscleGroup: MuscleGroup) => {
    setSelectedMuscleGroup(muscleGroup)
    setSearchQuery("")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Egzersiz Rehberi</h1>

      <FavoritesList />

      <SearchForm onSearch={handleSearch} />

      <MuscleGroupFilter selectedMuscleGroup={selectedMuscleGroup} onSelectMuscleGroup={handleSelectMuscleGroup} />

      <ExerciseList exercises={exercises || []} isLoading={isLoading} error={error as Error} />
    </div>
  )
}

export default Home
