import type React from "react"
import type { Exercise } from "../types"
import ExerciseCard from "./ExerciseCard"

interface ExerciseListProps {
  exercises: Exercise[]
  isLoading: boolean
  error: Error | null
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        <p>Egzersizler yüklenirken bir hata oluştu: {error.message}</p>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
        <p>Hiç egzersiz bulunamadı. Farklı bir arama deneyin..</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}

export default ExerciseList
