import RecipeCard from './RecipeCard'
import EmptyState from './EmptyState'

function RecipeList({
  recipes,
  hasSearched,
  selectedCategory,
  categories,
  onSelectCategory,
  onSearchSuggestion,
  onViewDetails,
  onToggleFavorite,
  isFavorite,
}) {
  if (recipes.length === 0) {
    if (!hasSearched && !selectedCategory) {
      return (
        <EmptyState
          categories={categories}
          onSelectCategory={onSelectCategory}
          onSearchSuggestion={onSearchSuggestion}
        />
      )
    }

    return (
      <p className="recipe-list__empty">
        {hasSearched
          ? 'No recipes found. Try a different search term.'
          : `No recipes found in ${selectedCategory}. Try another category.`}
      </p>
    )
  }

  return (
    <section className="recipe-list" aria-label="Recipe results">
      {selectedCategory && (
        <p className="recipe-list__context">
          Showing {recipes.length} recipe{recipes.length === 1 ? '' : 's'} in{' '}
          <strong>{selectedCategory}</strong>
        </p>
      )}
      {hasSearched && !selectedCategory && (
        <p className="recipe-list__context">
          Found {recipes.length} recipe{recipes.length === 1 ? '' : 's'}
        </p>
      )}
      <div className="recipe-list__grid">
        {recipes.map((recipe) => (
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

export default RecipeList
