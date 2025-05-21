import type React from "react"

import { useState } from "react"
import { Heart } from "lucide-react"
import { useFavorites } from "../context/FavoritesContext"
import ExerciseCard from "./ExerciseCard"

const FavoritesList: React.FC = () => {
  const { favorites } = useFavorites()
  const [showFavorites, setShowFavorites] = useState(false)

  if (favorites.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowFavorites(!showFavorites)}
        className="flex items-center gap-2 mb-4 btn btn-secondary"
      >
        <Heart className="fill-red-500 text-red-500" size={20} />
        <span>Favoriler ({favorites.length})</span>
        <span>{showFavorites ? "▲" : "▼"}</span>
      </button>

      {showFavorites && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesList
