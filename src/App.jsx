import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import RecipeList from './components/RecipeList'
import Favorites from './components/Favorites'
import RecipeDetails from './components/RecipeDetails'
import CategoryFilter from './components/CategoryFilter'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import {
  getCategories,
  getRecipeById,
  getRecipesByCategory,
  searchRecipes,
} from './services/mealApi'
import { loadFavorites, saveFavorites } from './utils/favoritesStorage'
import './App.css'

function App() {
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeView, setActiveView] = useState('search')

  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [categoriesError, setCategoriesError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [favorites, setFavorites] = useState(() => loadFavorites())

  const [selectedRecipeId, setSelectedRecipeId] = useState(null)
  const [recipeDetails, setRecipeDetails] = useState(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [detailsError, setDetailsError] = useState(null)

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  useEffect(() => {
    let isCancelled = false

    async function loadCategories() {
      setIsLoadingCategories(true)
      setCategoriesError(null)

      try {
        const results = await getCategories()

        if (!isCancelled) {
          setCategories(results)
        }
      } catch (err) {
        if (!isCancelled) {
          setCategoriesError(
            err.message || 'Could not load categories. Please refresh the page.',
          )
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingCategories(false)
        }
      }
    }

    loadCategories()

    return () => {
      isCancelled = true
    }
  }, [])

  function isFavorite(recipeId) {
    return favorites.some((recipe) => recipe.id === recipeId)
  }

  function toggleFavorite(recipe) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some((item) => item.id === recipe.id)

      if (alreadyFavorite) {
        return currentFavorites.filter((item) => item.id !== recipe.id)
      }

      return [...currentFavorites, recipe]
    })
  }

  function handleShowSearch() {
    setActiveView('search')
    handleBackToResults()
  }

  function handleShowFavorites() {
    setActiveView('favorites')
    handleBackToResults()
  }

  async function handleSearch(term) {
    const trimmedTerm = term.trim()

    setError(null)
    setActiveView('search')
    setSelectedCategory(null)
    handleBackToResults()

    if (!trimmedTerm) {
      setRecipes([])
      setHasSearched(false)
      setSearchTerm('')
      return
    }

    setSearchTerm(trimmedTerm)
    setIsLoading(true)
    setHasSearched(true)

    try {
      const results = await searchRecipes(trimmedTerm)
      setRecipes(results)
    } catch (err) {
      setRecipes([])
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSearchSuggestion(term) {
    setSearchTerm(term)
    handleSearch(term)
  }

  async function handleSelectCategory(categoryName) {
    setError(null)
    setActiveView('search')
    setHasSearched(false)
    setSearchTerm('')
    setSelectedCategory(categoryName)
    handleBackToResults()
    setIsLoading(true)

    try {
      const results = await getRecipesByCategory(categoryName)
      setRecipes(results)
    } catch (err) {
      setRecipes([])
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleViewDetails(recipeId) {
    setSelectedRecipeId(recipeId)
    setRecipeDetails(null)
    setDetailsError(null)
    setIsLoadingDetails(true)

    try {
      const details = await getRecipeById(recipeId)
      setRecipeDetails(details)
    } catch (err) {
      setDetailsError(
        err.message || 'Could not load recipe details. Please try again.',
      )
    } finally {
      setIsLoadingDetails(false)
    }
  }

  function handleBackToResults() {
    setSelectedRecipeId(null)
    setRecipeDetails(null)
    setDetailsError(null)
    setIsLoadingDetails(false)
  }

  const isViewingDetails = selectedRecipeId !== null

  return (
    <div className="app">
      <header className="app__header">
        <h1>Recipe Finder</h1>
        <p>Search for delicious recipes from around the world.</p>
      </header>

      <main className="app__main">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />

        {activeView === 'search' && !isViewingDetails && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            isLoading={isLoadingCategories}
            error={categoriesError}
          />
        )}

        <nav className="view-switcher" aria-label="Recipe views">
          <button
            type="button"
            className={`view-switcher__button${activeView === 'search' ? ' is-active' : ''}`}
            aria-current={activeView === 'search' ? 'page' : undefined}
            onClick={handleShowSearch}
          >
            Search Results
          </button>
          <button
            type="button"
            className={`view-switcher__button${activeView === 'favorites' ? ' is-active' : ''}`}
            aria-current={activeView === 'favorites' ? 'page' : undefined}
            onClick={handleShowFavorites}
          >
            Favorites ({favorites.length})
          </button>
        </nav>

        {isViewingDetails ? (
          <>
            {isLoadingDetails && (
              <LoadingSpinner message="Loading recipe details..." />
            )}
            {detailsError && (
              <div className="details-error">
                <ErrorMessage message={detailsError} />
                <button
                  type="button"
                  className="recipe-details__back"
                  onClick={handleBackToResults}
                >
                  ← Back to results
                </button>
              </div>
            )}
            {recipeDetails && !isLoadingDetails && (
              <RecipeDetails
                recipe={recipeDetails}
                onBack={handleBackToResults}
              />
            )}
          </>
        ) : activeView === 'search' ? (
          <>
            {isLoading && (
              <LoadingSpinner
                message={
                  selectedCategory
                    ? `Loading ${selectedCategory} recipes...`
                    : 'Loading recipes...'
                }
              />
            )}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && (
              <RecipeList
                recipes={recipes}
                hasSearched={hasSearched}
                selectedCategory={selectedCategory}
                categories={categories}
                onSelectCategory={handleSelectCategory}
                onSearchSuggestion={handleSearchSuggestion}
                onViewDetails={handleViewDetails}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            )}
          </>
        ) : (
          <Favorites
            favorites={favorites}
            onViewDetails={handleViewDetails}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </main>
    </div>
  )
}

export default App
