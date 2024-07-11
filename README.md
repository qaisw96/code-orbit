# Code Orbit: GitHub Search SPA with React and Next.js

This project is a Single Page Application (SPA) built with React and Next.js to search for public repositories and users on GitHub.

## Features

- Search for repositories and users
- Select search type (repositories or users)
- Display user avatar, name, and profile link
- Display repository details including:
  - Full name
  - Avatar of the last 3 users who forked it with links to their forks
  - badges based on most-used language in the repository
- Infinite scroll pagination
- Caching of search results for improved performance

### Caching Feature

To improve performance and reduce API requests, search results are cached. Subsequent searches with the same query and page number use the cache instead of making a new API request.

#### How Caching Works

- **Initial Search**: Fetch results from the GitHub API and cache them.
- **Subsequent Searches**: Use cached results if available.
- **Pagination**: Cache results for each page. When loading more results, check the cache before making a new API request.

#### Example Scenario

1. Search for "react" repositories.
2. Fetch and cache the first page of results.
3. Scroll to load more results, fetch, and cache the second page.
4. Search for "react" again, display the first page from the cache.
5. Scroll down, display the second page from the cache.

## Setup

### Prerequisites

- Node.js and npm (or yarn) installed on your system.

### Clone the repository

```bash

git clone https://github.com/qaisw96/code-orbit.git

```

### Install dependencies

```bash

cd code-orbit
npm install  # or yarn install

```

### Running the application

```bash

npm run dev  # or yarn dev

```

### Running Unit Tests

```bash

npm run test  # or yarn test

```

## Examples

After running the app

- Select "repos" as the search type, then search for repositories by keyword: enter a keyword in the search bar.

- Select "users" as the search type, then search for users by keyword: enter a keyword in the search bar.
