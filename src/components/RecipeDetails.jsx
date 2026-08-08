function RecipeDetails({ recipe, onBack }) {
  return (
    <article className="recipe-details">
      <button type="button" className="recipe-details__back" onClick={onBack}>
        ← Back to results
      </button>

      <header className="recipe-details__header">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-details__image"
        />
        <div className="recipe-details__intro">
          <h2 className="recipe-details__title">{recipe.name}</h2>
          <p className="recipe-details__meta">
            <span className="recipe-details__label">Category:</span>{' '}
            {recipe.category}
          </p>
          <p className="recipe-details__meta">
            <span className="recipe-details__label">Cuisine:</span>{' '}
            {recipe.cuisine}
          </p>
          {recipe.youtube && (
            <p className="recipe-details__meta">
              <a
                href={recipe.youtube}
                target="_blank"
                rel="noreferrer noopener"
                className="recipe-details__link"
              >
                Watch on YouTube
              </a>
            </p>
          )}
        </div>
      </header>

      <section className="recipe-details__section" aria-labelledby="ingredients-heading">
        <h3 id="ingredients-heading">Ingredients</h3>
        <ul className="recipe-details__ingredients">
          {recipe.ingredients.map((item) => (
            <li key={`${item.ingredient}-${item.measure}`}>
              {item.measure ? `${item.measure} ` : ''}
              {item.ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section className="recipe-details__section" aria-labelledby="instructions-heading">
        <h3 id="instructions-heading">Instructions</h3>
        <p className="recipe-details__instructions">{recipe.instructions}</p>
      </section>
    </article>
  )
}

export default RecipeDetails
