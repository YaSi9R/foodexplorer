"use client"

import { useState } from "react"

const SearchBar = ({ onSearch, placeholder, icon }) => {
  const [value, setValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        {icon}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
