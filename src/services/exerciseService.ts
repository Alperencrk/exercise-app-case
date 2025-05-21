import axios from "axios"
import type { Exercise, MuscleGroup } from "../types"

const API_URL = "https://exercisedb.p.rapidapi.com"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
})

// Tüm egzersizleri getiren fonksiyon
export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await api.get("/exercises?limit=1000")
    return response.data
  } catch (error) {
    console.error("Egzersizler alınırken bir hata oluştu:", error)
    throw error
  }
}

export const getExercisesByBodyPart = async (bodyPart: MuscleGroup): Promise<Exercise[]> => {
  if (bodyPart === "all") {
    return getExercises()
  }
  
  try {
    const response = await api.get(`/exercises/bodyPart/${bodyPart}?limit=1000`)
    return response.data
  } catch (error) {
    console.error(`Error fetching exercises for body part ${bodyPart}:`, error)
    throw error
  }
}

// ID'ye göre egzersiz getiren fonksiyon
export const getExerciseById = async (id: string): Promise<Exercise> => {
  try {
    const response = await api.get(`/exercises/exercise/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching exercise with id ${id}:`, error)
    throw error
  }
}

// Tüm egzersizleri önbelleğe alma işlemi
let allExercisesCache: Exercise[] | null = null;

export const getAllExercisesForSearch = async (): Promise<Exercise[]> => {
  if (allExercisesCache) {
    return allExercisesCache;
  }
  
  try {
    const exercises = await getExercises();
    allExercisesCache = exercises;
    return exercises;
  } catch (error) {
    console.error("Error fetching all exercises for search:", error);
    throw error;
  }
}

// Arama fonksiyonu
export const searchExercises = async (query: string, bodyPart: MuscleGroup = "all"): Promise<Exercise[]> => {
  try {
    const allExercises = await getAllExercisesForSearch();
    
    const lowerQuery = query.toLowerCase();
    

    let filteredExercises = allExercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(lowerQuery) ||
        exercise.target.toLowerCase().includes(lowerQuery) ||
        exercise.equipment.toLowerCase().includes(lowerQuery) ||
        exercise.bodyPart.toLowerCase().includes(lowerQuery)
    );
    
    if (bodyPart !== "all") {
      filteredExercises = filteredExercises.filter(
        (exercise) => exercise.bodyPart === bodyPart
      );
    }
    
    return filteredExercises;
  } catch (error) {
    console.error(`Error searching exercises with query ${query}:`, error)
    throw error
  }
}

export const getBodyPartList = async (): Promise<string[]> => {
  try {
    const response = await api.get("/exercises/bodyPartList")
    return response.data
  } catch (error) {
    console.error("Vücut bölgesi listesi alınırken bir hata oluştu:", error)
    throw error
  }
}