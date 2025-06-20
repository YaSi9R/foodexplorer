"use client"
import { SortAsc } from "lucide-react"

const SortOptions = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-options">
      <div className="sort-label">
        <SortAsc size={16} />
        <span>Sort by</span>
      </div>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className="sort-select">
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="grade-asc">Nutrition Grade (Best First)</option>
        <option value="grade-desc">Nutrition Grade (Worst First)</option>
      </select>
    </div>
  )
}

export default SortOptions
