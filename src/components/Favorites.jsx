import RecipeCard from './RecipeCard'

function Favorites({ favorites, onViewDetails, onToggleFavorite, isFavorite }) {
  if (favorites.length === 0) {
    return (
      <p className="favorites__empty">
        You have no favorite recipes yet. Search for recipes and use the favorite
        button to save them here.
      </p>
    )
  }

  return (
    <section className="recipe-list" aria-label="Favorite recipes">
      <div className="recipe-list__grid">
        {favorites.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onViewDetails={onViewDetails}
            isFavorite={isFavorite(recipe.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  )
}

export default Favorites
