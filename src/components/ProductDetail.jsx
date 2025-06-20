"use client"
import { ArrowLeft, Package, Award, Info, Zap } from "lucide-react"

const ProductDetail = ({ product, onBack }) => {
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

  const formatNutrientValue = (value, unit) => {
    if (!value) return "N/A"
    return `${value}${unit || ""}`
  }

  return (
    <div className="product-detail">
      <div className="container">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft />
          Back to Products
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            {product.image_url ? (
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.product_name || "Product"}
                onError={(e) => {
                  e.target.style.display = "none"
                  e.target.nextSibling.style.display = "flex"
                }}
              />
            ) : null}
            <div className="product-image-placeholder-large" style={{ display: product.image_url ? "none" : "flex" }}>
              <Package size={80} />
            </div>
          </div>

          <div className="product-detail-info">
            <div className="product-header">
              <h1>{product.product_name || "Unknown Product"}</h1>
              {product.nutrition_grades && (
                <div
                  className="nutrition-grade-large"
                  style={{ backgroundColor: getGradeColor(product.nutrition_grades) }}
                >
                  {product.nutrition_grades.toUpperCase()}
                </div>
              )}
            </div>

            {product.brands && (
              <p className="product-brand">
                <strong>Brand:</strong> {product.brands}
              </p>
            )}

            {product.categories && (
              <p className="product-categories">
                <strong>Categories:</strong> {product.categories}
              </p>
            )}

            {product.labels && (
              <div className="product-labels-detail">
                <h3>
                  <Award /> Labels
                </h3>
                <div className="labels-grid">
                  {product.labels.split(",").map((label, index) => (
                    <span key={index} className="label-tag">
                      {label.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.ingredients_text && (
              <div className="ingredients-section">
                <h3>
                  <Info /> Ingredients
                </h3>
                <p>{product.ingredients_text}</p>
              </div>
            )}

            {product.nutriments && (
              <div className="nutrition-section">
                <h3>
                  <Zap /> Nutritional Information (per 100g)
                </h3>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Energy</span>
                    <span className="nutrition-value">
                      {formatNutrientValue(product.nutriments.energy_100g, " kJ")}
                    </span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fat</span>
                    <span className="nutrition-value">{formatNutrientValue(product.nutriments.fat_100g, "g")}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Carbohydrates</span>
                    <span className="nutrition-value">
                      {formatNutrientValue(product.nutriments.carbohydrates_100g, "g")}
                    </span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Proteins</span>
                    <span className="nutrition-value">
                      {formatNutrientValue(product.nutriments.proteins_100g, "g")}
                    </span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Salt</span>
                    <span className="nutrition-value">{formatNutrientValue(product.nutriments.salt_100g, "g")}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Sugars</span>
                    <span className="nutrition-value">{formatNutrientValue(product.nutriments.sugars_100g, "g")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
