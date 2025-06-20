"use client"
import { Filter } from "lucide-react"

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <div className="filter-label">
        <Filter size={16} />
        <span>Category</span>
      </div>
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className="category-select">
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
