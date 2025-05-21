import type React from "react"

import { useFormik } from "formik"
import { Search } from "lucide-react"
import * as Yup from "yup"

interface SearchFormProps {
  onSearch: (query: string) => void
}

const SearchSchema = Yup.object().shape({
  query: Yup.string().min(2, "Arama için en az 2 karakter gerekli").required("Arama terimi gerekli"),
})

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const formik = useFormik({
    initialValues: {
      query: "",
    },
    validationSchema: SearchSchema,
    onSubmit: (values) => {
      onSearch(values.query)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="mb-6">
      <div className="relative">
        <input
          id="query"
          name="query"
          type="text"
          placeholder="Egzersiz, kas grubu veya ekipman ara..."
          className={`w-full p-3 pl-10 rounded-lg border ${
            formik.errors.query && formik.touched.query ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.query}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-400" size={20} />
        </div>
        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-primary">
          Ara
        </button>
      </div>
      {formik.errors.query && formik.touched.query && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.query}</div>
      )}
    </form>
  )
}

export default SearchForm
