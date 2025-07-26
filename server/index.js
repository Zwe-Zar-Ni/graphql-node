import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games: () => db.games,
    authors: () => db.authors,
    reviews: () => db.reviews,
    game: (_, { id }) => db.games.find((game) => game.id === id),
    author: (_, { id }) => db.authors.find((author) => author.id === id),
    review: (_, { id }) => db.reviews.find((review) => review.id === id),
  },
  Game : {
    reviews: (parent) => db.reviews.filter((review) => review.game_id === parent.id),
  },
  Author : {
    reviews: (parent) => db.reviews.filter((review) => review.author_id === parent.id),
  },
  Review : {
    author: (parent) => db.authors.find((author) => author.id === parent.author_id),
    game: (parent) => db.games.find((game) => game.id === parent.game_id),
  },
  Mutation: {
    addGame: (_, args) => {
      const game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000),
      };
      db.games.push(game);
      return game;
    },
    updateGame : (_, { id, edits }) => {
      db.games = db.games.map((game) => {
        if (game.id == id) {
          return {
            ...game,
            ...edits,
          };
        }
        return game;
      });
      return db.games.find((game) => game.id == id);
    },
    deleteGame: (_, { id }) => {
      db.games = db.games.filter((game) => game.id != id);
      return db.games;
    },
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);