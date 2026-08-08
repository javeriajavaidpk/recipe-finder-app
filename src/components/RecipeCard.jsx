function RecipeCard({ recipe, onViewDetails, isFavorite, onToggleFavorite }) {
  const favoriteLabel = isFavorite
    ? `Remove ${recipe.name} from favorites`
    : `Add ${recipe.name} to favorites`

  return (
    <article className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-card__image"
      />
      <div className="recipe-card__content">
        <h2 className="recipe-card__title">{recipe.name}</h2>
        <p className="recipe-card__detail">
          <span className="recipe-card__label">Category:</span> {recipe.category}
        </p>
        {recipe.cuisine && (
          <p className="recipe-card__detail">
            <span className="recipe-card__label">Cuisine:</span> {recipe.cuisine}
          </p>
        )}
        <div className="recipe-card__actions">
          <button
            type="button"
            className={`recipe-card__favorite${isFavorite ? ' is-active' : ''}`}
            onClick={() => onToggleFavorite(recipe)}
            aria-pressed={isFavorite}
            aria-label={favoriteLabel}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <button
            type="button"
            className="recipe-card__button"
            onClick={() => onViewDetails(recipe.id)}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  )
}

export default RecipeCard
