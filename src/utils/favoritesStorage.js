const STORAGE_KEY = 'recipe-finder-favorites'

function isValidRecipe(recipe) {
  return (
    recipe &&
    typeof recipe === 'object' &&
    typeof recipe.id === 'string' &&
    typeof recipe.name === 'string' &&
    typeof recipe.category === 'string' &&
    typeof recipe.cuisine === 'string' &&
    typeof recipe.image === 'string'
  )
}

export function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isValidRecipe)
  } catch {
    return []
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // Ignore write errors (e.g. storage full or disabled in private browsing).
  }
}
