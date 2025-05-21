import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { Exercise } from "../types"

interface FavoritesContextType {
  favorites: Exercise[]
  addFavorite: (exercise: Exercise) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

interface FavoritesProviderProps {
  children: React.ReactNode
}

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Exercise[]>(() => {
    const savedFavorites = localStorage.getItem("fav")
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (exercise: Exercise) => {
    setFavorites((prev) => [...prev, exercise])
    toast.success("Favorilere eklendi!")
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((exercise) => exercise.id !== id))
    toast.success("Favorilerden kaldırıldı!")
  }

  const isFavorite = (id: string) => {
    return favorites.some((exercise) => exercise.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
