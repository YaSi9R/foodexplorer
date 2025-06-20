"use client"
import { Package, Award } from "lucide-react"

const ProductCard = ({ product, onClick }) => {
  const getGradeColor = (grade) => {
    switch (grade?.toLowerCase()) {
      case "a":
        return "#00b894"
      case "b":
        return "#00cec9"
      case "c":
        return "#fdcb6e"
      case "d":
        return "#e17055"
      case "e":
        return "#d63031"
      default:
        return "#74b9ff"
    }
  }

  const truncateText = (text, maxLength) => {
    if (!text) return "N/A"
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image-container">
        {product.image_url ? (
          <img
            src={product.image_url || "/placeholder.svg"}
            alt={product.product_name || "Product"}
            className="product-image"
            onError={(e) => {
              e.target.style.display = "none"
              e.target.nextSibling.style.display = "flex"
            }}
          />
        ) : null}
        <div className="product-image-placeholder" style={{ display: product.image_url ? "none" : "flex" }}>
          <Package />
        </div>

        {product.nutrition_grades && (
          <div className="nutrition-grade" style={{ backgroundColor: getGradeColor(product.nutrition_grades) }}>
            {product.nutrition_grades.toUpperCase()}
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{truncateText(product.product_name, 50)}</h3>

        <div className="product-meta">
          {product.categories && (
            <span className="product-category">{truncateText(product.categories.split(",")[0], 30)}</span>
          )}
        </div>

        {product.ingredients_text && (
          <p className="product-ingredients">
            <strong>Ingredients:</strong> {truncateText(product.ingredients_text, 80)}
          </p>
        )}

        <div className="product-labels">
          {product.labels &&
            product.labels
              .split(",")
              .slice(0, 2)
              .map((label, index) => (
                <span key={index} className="product-label">
                  <Award size={12} />
                  {label.trim()}
                </span>
              ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
