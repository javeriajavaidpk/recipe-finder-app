function LoadingSpinner({ message = 'Loading recipes...' }) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="loading-spinner__circle" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  )
}

export default LoadingSpinner
