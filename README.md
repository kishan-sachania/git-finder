# GitHub Finder

GitHub Finder is a React + Vite-based web application that allows users to search for GitHub users and their repositories. It provides features like sorting repositories, searching repositories by name, and redirecting to the repository page. The application also maintains a history of user searches using Redux Toolkit with persistence.

## Features

- **Search GitHub Users**: Find GitHub users by their username.
- **View Repositories**: Display repositories of a user sorted by default (as provided by the GitHub API).
- **Sorting Options**:
  - Sort repositories by name (Z-A).
  - Sort repositories by star count.
  - Reset filters to default.
- **Search Repositories**: Search for a specific repository by name.
- **Redirect to Repository**: Click on a repository to navigate to its GitHub page.
- **Search History**: Maintains a history of user searches using Redux Toolkit with persistence.
- **Clear History**: Option to clear the search history.
- **Responsive UI**: It Suppourt sm, md, lg and xl Dimensions of Responsiveness 

## Technologies Used

- **React + Vite**: For building the frontend.
- **Tailwind CSS**: For styling the application.
- **ShadCN**: For reusable components.
- **Axios**: For making API calls to the GitHub API.
- **Redux Toolkit**: For state management.
- **Redux Persist**: For persisting the search history.

## Project Structure
```
src/
├── assets/
├── components/
│ ├── layout/
│ │ ├── api/
│ │ ├── components/
│ │ └── index.jsx
├── pages/
│ ├── user-repo/
│ └── index.jsx
├── ui/
├── config/
├── lib/
├── redux/
├── App.css
├── App.jsx
├── index.css
├── main.jsx
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
└── package-lock.json
```


## Installation and Setup

Follow these steps to pull the repository and start the application:

1. Clone the repository:
   ```bash
   git clone https://github.com/kishan-sachania/git-finder.git

2. Navigate to the project directory:
  cd <project-directory>

3. Install dependencies:
  npm install

4. Start the development server:
  npm run dev


#Example to Search 
1 Username -mansi 
    user have no repositories so we can see the    error ui saying "No Repository found"
2. Add Random word without space as git dont have space username to get "User Not Found"

# Usage
- **Search for a GitHub User:** Enter a GitHub username in the search bar to fetch user details and their repositories.
- **Sort Repositories:** Use sorting options to sort repositories by name (Z-A) or star count.
- **Search Repositories:** Use the search bar to filter repositories by name.
- **View Repository Details:** Click a repository to navigate to its GitHub page.
- **Manage Search History:** View and clear the history of searched users.

# API Integration
- Uses the GitHub API to fetch user details and repositories.
- Repositories are sorted by default based on API response.

# Scripts
- `npm run dev` - Start development server.
- `npm run build` - Build for production.
- `npm run preview` - Preview production build.

# License
- Licensed under MIT License. See LICENSE file for details.
