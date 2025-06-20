"use client"
import { useState } from "react"
import { Search, Barcode, Loader2 } from "lucide-react"

const UnifiedSearchBar = ({ onSearch, loading }) => {
  const [value, setValue] = useState("")
  const [searchMode, setSearchMode] = useState("name") // "name" or "barcode"

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value.trim(), searchMode)
    }
  }

  const toggleSearchMode = () => {
    setSearchMode(searchMode === "name" ? "barcode" : "name")
    setValue("") // Clear input when switching modes
  }

  return (
    <div className="unified-search-container">
      <div className="search-mode-toggle">
        <button
          type="button"
          className={`mode-btn ${searchMode === "name" ? "active" : ""}`}
          onClick={() => {
            setSearchMode("name")
            setValue("")
          }}
        >
          <Search size={16} />
          Name
        </button>
        <button
          type="button"
          className={`mode-btn ${searchMode === "barcode" ? "active" : ""}`}
          onClick={() => {
            setSearchMode("barcode")
            setValue("")
          }}
        >
          <Barcode size={16} />
          Barcode
        </button>
      </div>

      <form className="unified-search-bar" onSubmit={handleSubmit}>
        <div className="search-input-container">
          {searchMode === "name" ? <Search size={20} /> : <Barcode size={20} />}
          <input
            type={searchMode === "barcode" ? "number" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={searchMode === "name" ? "Search products by name..." : "Enter product barcode..."}
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-btn" disabled={loading || !value.trim()}>
            {loading ? (
              <>
                <Loader2 className="search-loading-icon" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UnifiedSearchBar
