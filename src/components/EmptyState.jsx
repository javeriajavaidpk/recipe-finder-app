const SUGGESTED_SEARCHES = ['chicken', 'pasta', 'cake', 'salad']

const FEATURED_CATEGORIES = [
  'Beef',
  'Chicken',
  'Dessert',
  'Pasta',
  'Seafood',
  'Vegetarian',
  'Breakfast',
]

function EmptyState({ categories, onSelectCategory, onSearchSuggestion }) {
  const featuredCategories = FEATURED_CATEGORIES.map((name) =>
    categories.find((category) => category.name === name),
  ).filter(Boolean)

  const quickPickCategories =
    featuredCategories.length > 0 ? featuredCategories : categories.slice(0, 8)

  return (
    <section className="empty-state" aria-label="Discover recipes">
      <h2 className="empty-state__title">Discover your next meal</h2>
      <p className="empty-state__intro">
        Browse recipes by category or search for something specific. TheMealDB
        has hundreds of dishes from around the world.
      </p>

      {quickPickCategories.length > 0 && (
        <div className="empty-state__section">
          <h3 className="empty-state__subtitle">Popular categories</h3>
          <div className="empty-state__categories">
            {quickPickCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="empty-state__category-button"
                onClick={() => onSelectCategory(category.name)}
              >
                <img
                  src={category.thumbnail}
                  alt=""
                  className="empty-state__category-thumb"
                  loading="lazy"
                />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="empty-state__section">
        <h3 className="empty-state__subtitle">Try searching for</h3>
        <div className="empty-state__searches">
          {SUGGESTED_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              className="empty-state__search-button"
              onClick={() => onSearchSuggestion(term)}
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmptyState
