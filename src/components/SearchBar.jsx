function SearchBar({ value, onChange, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="search" className="search-bar__label">
        Search for a recipe
      </label>
      <div className="search-bar__controls">
        <input
          id="search"
          name="search"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="e.g. pasta, chicken, cake"
          className="search-bar__input"
        />
        <button type="submit" className="search-bar__button">
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
