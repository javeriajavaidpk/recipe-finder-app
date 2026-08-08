const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

function mapMealToRecipeSummary(meal) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    cuisine: meal.strArea,
    image: meal.strMealThumb,
  }
}

function mapMealIngredients(meal) {
  const ingredients = []

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = meal[`strIngredient${index}`]
    const measure = meal[`strMeasure${index}`]

    if (ingredient?.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || '',
      })
    }
  }

  return ingredients
}

function mapMealToRecipeDetails(meal) {
  return {
    ...mapMealToRecipeSummary(meal),
    instructions: meal.strInstructions,
    youtube: meal.strYoutube || null,
    ingredients: mapMealIngredients(meal),
  }
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories.php`)

  if (!response.ok) {
    throw new Error('Failed to fetch categories. Please try again.')
  }

  const data = await response.json()

  if (!data.categories) {
    return []
  }

  return data.categories.map((category) => ({
    id: category.idCategory,
    name: category.strCategory,
    thumbnail: category.strCategoryThumb,
    description: category.strCategoryDescription,
  }))
}

export async function getRecipesByCategory(categoryName) {
  const response = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(categoryName)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch recipes for this category. Please try again.')
  }

  const data = await response.json()

  if (!data.meals) {
    return []
  }

  return data.meals.map((meal) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    category: categoryName,
    cuisine: null,
    image: meal.strMealThumb,
  }))
}

export async function searchRecipes(query) {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch recipes. Please try again.')
  }

  const data = await response.json()

  if (!data.meals) {
    return []
  }

  return data.meals.map(mapMealToRecipeSummary)
}

export async function getRecipeById(id) {
  const response = await fetch(
    `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch recipe details. Please try again.')
  }

  const data = await response.json()

  if (!data.meals?.[0]) {
    throw new Error('Recipe not found.')
  }

  return mapMealToRecipeDetails(data.meals[0])
}
