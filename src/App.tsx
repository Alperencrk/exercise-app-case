import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import FavoritesProvider from "./context/FavoritesContext"
import ExerciseDetail from "./pages/ExerciseDetail"
import Home from "./pages/Home"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercise/:id" element={<ExerciseDetail />} />
              </Routes>
            </main>
            <Toaster position="bottom-right" />
          </div>
        </BrowserRouter>
      </FavoritesProvider>

    </QueryClientProvider>
  )
}

export default App
