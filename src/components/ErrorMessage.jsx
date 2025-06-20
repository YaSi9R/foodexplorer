"use client"
import { AlertCircle, RefreshCw } from "lucide-react"

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <AlertCircle className="error-icon" />
        <h3>Oops! Something went wrong</h3>
        <p>{message || "Unable to load data. Please check your internet connection and try again."}</p>
        {onRetry && (
          <button className="retry-btn" onClick={onRetry}>
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
