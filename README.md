# GraphQL with Node.js

This guide will set up a GraphQL server using Node.js, Apollo Server, and ES modules.

[Apollo - React - GraphQL](https://www.apollographql.com/docs/react/get-started/)

[Apollo - Node - GraphQl](https://www.apollographql.com/docs/apollo-server/getting-started)

## Prerequisites

- Node.js installed (version 20+ recommended)

## Setup Instructions

### 1. Initialize the Project

```
cd server
```

```
npm init --yes && npm pkg set type="module"
```

This creates a `package.json` file and sets the project to use ES modules.

### 2. Install Dependencies

```
npm install @apollo/server graphql
```

Installs Apollo Server (the GraphQL server) and GraphQL (the JavaScript reference implementation).

## File Structure

```
project/
  server
    ├── index.js        # Main server file
    ├── schema.js       # GraphQL type definitions
    └── _db.js          # Mock database
  client
```

## Code Explanation

### \_db.js - Mock Database

This file contains mock data for games, authors, and reviews that we'll use in our GraphQL server.

### schema.js - Type Definitions

This file defines our GraphQL schema:

- Types (Game, Review, Author) with their fields
- Query operations for fetching data
- Mutation operations for modifying data
- Input types for mutation arguments

### index.js - Server Implementation

Initial file

## Running the Server

1.  Start the server:

```
node index.js
```

2.  Open your browser to:

```
http://localhost:4000
```

## Testing the API

You can now use the Apollo Studio interface to test your GraphQL API. Try these example queries:

### Query Examples

```
# Get all games with their titles and platforms
query GetGames {
  games {
    id
    title
    platform
  }
}

# Get a specific game with its reviews
query GetGameWithReviews {
  game(id: "1") {
    title
    platform
    reviews {
      rating
      content
      author {
        name
      }
    }
  }
}
```

### Mutation Examples

```
# Add a new game
mutation AddGame {
  addGame(game: { title: "New Game", platform: ["PC"] }) {
    id
    title
    platform
  }
}

# Update a game
mutation UpdateGame {
  updateGame(id: "1", edits: { title: "Updated Title" }) {
    id
    title
    platform
  }
}

# Delete a game
mutation DeleteGame {
  deleteGame(id: "1") {
    id
    title
  }
}
```

## Client

```
cd client
npm install
npm run dev
```

## Key Concepts Explained

1.  **Type Definitions**: Define the shape of your data and operations
2.  **Resolvers**: Functions that return data for each field in your schema
3.  **Queries**: Operations to fetch data
4.  **Mutations**: Operations to modify data
5.  **Relationships**: How types connect to each other (e.g., Game to Reviews)

This implementation provides a complete GraphQL API for managing games, reviews, and authors with full CRUD operations.
