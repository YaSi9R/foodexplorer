"use client"

import { useState, useEffect } from "react"
import { Package, Loader2 } from "lucide-react"
import ProductGrid from "./components/ProductGrid"
import ProductDetail from "./components/ProductDetail"
import UnifiedSearchBar from "./components/UnifiedSearchBar"
import CategoryFilter from "./components/CategoryFilter"
import SortOptions from "./components/SortOptions"
import "./App.css"

const App = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(null)
  const [currentSearch, setCurrentSearch] = useState({ term: "", mode: "name" })

  // Fetch initial products
  useEffect(() => {
    fetchInitialProducts()
    fetchCategories()
  }, [])

  // Filter and sort products when dependencies change
  useEffect(() => {
    filterAndSortProducts()
  }, [products, sortBy])

  const fetchInitialProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=popular&page=1&page_size=20&json=true&sort_by=unique_scans_n`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch products (${response.status})`)
      }

      const data = await response.json()

      if (data.products && data.products.length > 0) {
        setProducts(data.products)
        setHasMore(data.products.length === 20)
      } else {
        // Fallback to basic search if popular doesn't work
        const fallbackResponse = await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=&page=1&page_size=20&json=true`,
        )
        const fallbackData = await fallbackResponse.json()
        setProducts(fallbackData.products || [])
        setHasMore((fallbackData.products || []).length === 20)
      }
    } catch (error) {
      console.error("Error fetching initial products:", error)
      setError(error.message)
      setProducts([])
      setHasMore(false)
    }
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      // Use a more reliable endpoint for categories
      const response = await fetch(
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms=&page=1&page_size=50&json=true",
      )
      const data = await response.json()

      if (data.products && data.products.length > 0) {
        // Extract unique categories from products
        const categorySet = new Set()
        data.products.forEach((product) => {
          if (product.categories) {
            const cats = product.categories.split(",")
            cats.forEach((cat) => {
              const cleanCat = cat.trim()
              if (cleanCat && cleanCat.length > 2) {
                categorySet.add(cleanCat)
              }
            })
          }
        })

        const uniqueCategories = Array.from(categorySet)
          .slice(0, 15)
          .map((cat) => ({
            id: cat
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, ""),
            name: cat,
          }))

        setCategories(uniqueCategories)
      } else {
        setCategories(getFallbackCategories())
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories(getFallbackCategories())
    }
  }

  const getFallbackCategories = () => [
    { id: "beverages", name: "Beverages" },
    { id: "dairy", name: "Dairy products" },
    { id: "snacks", name: "Snacks" },
    { id: "breakfast-cereals", name: "Breakfast cereals" },
    { id: "bread", name: "Bread" },
    { id: "chocolate", name: "Chocolate" },
    { id: "cookies", name: "Cookies" },
    { id: "frozen-foods", name: "Frozen foods" },
    { id: "meat", name: "Meat" },
    { id: "fish", name: "Fish" },
    { id: "fruits", name: "Fruits" },
    { id: "vegetables", name: "Vegetables" },
    { id: "yogurt", name: "Yogurt" },
    { id: "cheese", name: "Cheese" },
    { id: "pasta", name: "Pasta" },
  ]

  const handleSearch = async (searchTerm, searchMode) => {
    setSearchLoading(true)
    setError(null)
    setCurrentSearch({ term: searchTerm, mode: searchMode })

    try {
      let response
      let data

      if (searchMode === "barcode") {
        // Search by barcode
        response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${searchTerm}.json`)

        if (!response.ok) {
          throw new Error(`Product not found for barcode: ${searchTerm}`)
        }

        data = await response.json()

        if (data.product && data.status === 1) {
          setProducts([data.product])
          setHasMore(false)
        } else {
          setProducts([])
          setHasMore(false)
          setError(`No product found with barcode: ${searchTerm}`)
        }
      } else {
        // Search by name
        const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchTerm)}&page=1&page_size=50&json=true&sort_by=unique_scans_n`
        response = await fetch(searchUrl)

        if (!response.ok) {
          throw new Error(`Search failed (${response.status})`)
        }

        data = await response.json()

        if (data.products && data.products.length > 0) {
          setProducts(data.products)
          setHasMore(data.products.length === 50)
        } else {
          setProducts([])
          setHasMore(false)
          setError(`No products found for: "${searchTerm}"`)
        }
      }
    } catch (error) {
      console.error("Error searching products:", error)
      setError(error.message)
      setProducts([])
      setHasMore(false)
    }

    setSearchLoading(false)
  }

  const fetchProductsByCategory = async (category) => {
    if (!category) {
      fetchInitialProducts()
      setCurrentSearch({ term: "", mode: "name" })
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodeURIComponent(category)}&page=1&page_size=50&json=true&sort_by=unique_scans_n`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch category products (${response.status})`)
      }

      const data = await response.json()

      if (data.products && data.products.length > 0) {
        setProducts(data.products)
        setHasMore(data.products.length === 50)
      } else {
        setProducts([])
        setHasMore(false)
        setError(`No products found in category: ${category}`)
      }
    } catch (error) {
      console.error("Error fetching products by category:", error)
      setError(error.message)
      setProducts([])
      setHasMore(false)
    }
    setLoading(false)
  }

  const filterAndSortProducts = () => {
    const filtered = [...products]

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return (a.product_name || "").localeCompare(b.product_name || "")
        case "name-desc":
          return (b.product_name || "").localeCompare(a.product_name || "")
        case "grade-asc":
          return (a.nutrition_grades || "z").localeCompare(b.nutrition_grades || "z")
        case "grade-desc":
          return (b.nutrition_grades || "a").localeCompare(a.nutrition_grades || "a")
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }

  const loadMore = async () => {
    if (loading || !hasMore || currentSearch.term) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=popular&page=${nextPage}&page_size=20&json=true&sort_by=unique_scans_n`,
      )
      const data = await response.json()

      if (data.products && data.products.length > 0) {
        setProducts((prev) => [...prev, ...data.products])
        setPage(nextPage)
        setHasMore(data.products.length === 20)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error loading more products:", error)
      setHasMore(false)
    }
    setLoading(false)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    fetchProductsByCategory(category)
  }

  const retryFetch = () => {
    if (currentSearch.term) {
      handleSearch(currentSearch.term, currentSearch.mode)
    } else {
      fetchInitialProducts()
    }
  }

  const clearSearch = () => {
    setCurrentSearch({ term: "", mode: "name" })
    setSelectedCategory("")
    fetchInitialProducts()
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Package className="logo-icon" />
              <h1>Food Explorer</h1>
            </div>
            <p className="subtitle">Discover and explore food products from around the world</p>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="search-section">
            <UnifiedSearchBar onSearch={handleSearch} loading={searchLoading} />

            {(currentSearch.term || selectedCategory) && (
              <div className="active-filters">
                {currentSearch.term && (
                  <div className="active-filter">
                    <span>
                      {currentSearch.mode === "barcode" ? "Barcode" : "Search"}: {currentSearch.term}
                    </span>
                    <button onClick={clearSearch} className="clear-filter">
                      ×
                    </button>
                  </div>
                )}
                {selectedCategory && (
                  <div className="active-filter">
                    <span>Category: {categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}</span>
                    <button onClick={() => handleCategoryChange("")} className="clear-filter">
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="filters-section">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {(loading && products.length === 0) || searchLoading ? (
            <div className="loading">
              <Loader2 className="loading-icon" />
              <p>{searchLoading ? "Searching products..." : "Loading products..."}</p>
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              onProductClick={setSelectedProduct}
              onLoadMore={loadMore}
              hasMore={hasMore}
              loading={loading}
              error={error}
              onRetry={retryFetch}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
