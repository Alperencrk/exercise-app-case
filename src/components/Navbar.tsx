import { Link } from "react-router-dom"
import { Dumbbell } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="bg-emerald-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Dumbbell size={24} />
          <span>Egzersiz Rehberi</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
