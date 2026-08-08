# 🍳 Recipe Finder App

A responsive recipe discovery web application built with React and Vite. Users can search for recipes, browse recipes by category, view detailed cooking information, and save their favorite recipes for later.

## ✨ Features

- 🔍 Search recipes by name

- 🗂️ Browse recipes by category

- 🍽️ View multiple recipes from each category

- 📖 View complete recipe details

- 🧂 View ingredients and measurements

- 📝 View cooking instructions

- ❤️ Add and remove recipes from Favorites

- 💾 Persist Favorites using browser localStorage

- ⏳ Loading states for API requests

- ⚠️ User-friendly error handling

- 📱 Responsive design for desktop, tablet, and mobile

- ♿ Accessible buttons, labels, loading states, and error messages

- 🔄 Return to search results after viewing recipe details

## 🛠️ Technologies Used

- React

- Vite

- JavaScript

- HTML5

- CSS3

- React Hooks

- Browser localStorage

- TheMealDB API

## 🌐 API

This project uses the free [TheMealDB]([https://www.themealdb.com/](https://www.themealdb.com/)) API to retrieve recipe and category data.

The application uses the API to:

- Search recipes

- Retrieve recipes by category

- Retrieve complete recipe details

## 📁 Project Structure

```text

Recipe-Finder-App/

├── public/

├── src/

│   ├── components/

│   │   ├── CategoryFilter.jsx

│   │   ├── EmptyState.jsx

│   │   ├── ErrorMessage.jsx

│   │   ├── Favorites.jsx

│   │   ├── LoadingSpinner.jsx

│   │   ├── RecipeCard.jsx

│   │   ├── RecipeDetails.jsx

│   │   ├── RecipeList.jsx

│   │   └── SearchBar.jsx

│   ├── services/

│   │   └── mealApi.js

│   ├── utils/

│   │   └── favoritesStorage.js

│   ├── App.jsx

│   ├── App.css

│   ├── index.css

│   └── main.jsx

├── index.html

├── package.json

└── vite.config.js

