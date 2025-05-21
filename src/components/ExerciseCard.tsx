import type React from "react"

import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"
import type { Exercise } from "../types"

interface ExerciseCardProps {
  exercise: Exercise
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const isFav = isFavorite(exercise.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFav) {
      removeFavorite(exercise.id)
    } else {
      addFavorite(exercise)
    }
  }

  return (
    <Link
      to={`/exercise/${exercise.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 bg-gray-100">
        <img
          src={exercise.gifUrl || "/placeholder.svg"}
          alt={exercise.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} className={isFav ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg capitalize">{exercise.name}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">{exercise.bodyPart}</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{exercise.target}</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{exercise.equipment}</span>
        </div>
      </div>
    </Link>
  )
}

export default ExerciseCard
