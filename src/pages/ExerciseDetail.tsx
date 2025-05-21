import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, Dumbbell, Heart, Target } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"
import { getExerciseById } from "../services/exerciseService"

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercise", id],
    queryFn: () => getExerciseById(id!),
    enabled: !!id,
  })

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
        <p>Egzersiz yüklenirken bir hata oluştu: {(error as Error).message}</p>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
        <p>Egzersiz bulunamadı.</p>
      </div>
    )
  }

  const isFav = isFavorite(exercise.id)

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(exercise.id)
    } else {
      addFavorite(exercise)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
          <ArrowLeft size={20} />
          <span>Tüm Egzersizlere Dön</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
            <img
              src={exercise.gifUrl || "/placeholder.svg"}
              alt={exercise.name}
              className="max-h-[400px] object-contain"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold capitalize mb-4">{exercise.name}</h1>
              <button
                onClick={handleFavoriteClick}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={24} className={isFav ? "fill-red-500 text-red-500" : "text-gray-500"} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <Dumbbell size={18} />
                  <span className="font-medium">Ekipman:</span>
                </div>
                <p className="capitalize">{exercise.equipment}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <Target size={18} />
                  <span className="font-medium">Hedef Kas:</span>
                </div>
                <p className="capitalize">{exercise.target}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Kas Grupları</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full capitalize">
                  {exercise.bodyPart}
                </span>
                {exercise.secondaryMuscles?.map((muscle) => (
                  <span key={muscle} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full capitalize">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {exercise.instructions && exercise.instructions.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Talimatlar</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseDetail
