function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  isLoading,
  error,
}) {
  if (isLoading) {
    return (
      <section className="category-filter" aria-label="Recipe categories">
        <h2 className="category-filter__heading">Browse by Category</h2>
        <div className="category-filter__loading" role="status" aria-live="polite">
          <div className="category-filter__skeleton" aria-hidden="true" />
          <div className="category-filter__skeleton" aria-hidden="true" />
          <div className="category-filter__skeleton" aria-hidden="true" />
          <div className="category-filter__skeleton" aria-hidden="true" />
          <div className="category-filter__skeleton" aria-hidden="true" />
          <div className="category-filter__skeleton" aria-hidden="true" />
        </div>
        <p className="category-filter__loading-text">Loading categories...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="category-filter" aria-label="Recipe categories">
        <h2 className="category-filter__heading">Browse by Category</h2>
        <p className="category-filter__error" role="alert">
          {error}
        </p>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="category-filter" aria-label="Recipe categories">
      <h2 className="category-filter__heading">Browse by Category</h2>
      <div className="category-filter__list" role="list">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name

          return (
            <button
              key={category.id}
              type="button"
              role="listitem"
              className={`category-filter__chip${isSelected ? ' is-active' : ''}`}
              aria-pressed={isSelected}
              onClick={() => onSelectCategory(category.name)}
            >
              <span className="category-filter__thumb-wrap">
                <img
                  src={category.thumbnail}
                  alt=""
                  className="category-filter__thumb"
                  loading="lazy"
                />
              </span>
              <span className="category-filter__name">{category.name}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default CategoryFilter
