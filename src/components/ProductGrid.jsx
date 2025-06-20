"use client"
import { Loader2 } from "lucide-react"
import ProductCard from "./ProductCard"
import ErrorMessage from "./ErrorMessage"

const ProductGrid = ({ products, onProductClick, onLoadMore, hasMore, loading, error, onRetry }) => {
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="no-products">
        <p>No products found. Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={`${product.code || product._id || index}`}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>

      {hasMore && (
        <div className="load-more-section">
          <button className="load-more-btn" onClick={onLoadMore} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="loading-icon" />
                Loading...
              </>
            ) : (
              "Load More Products"
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
