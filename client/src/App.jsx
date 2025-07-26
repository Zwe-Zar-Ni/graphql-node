import { useQuery, gql, useMutation } from "@apollo/client";
import AddGame from "./components/AddGame";

const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
      reviews {
        id
        content
        rating
        author {
          id
          name
        }
      }
    }
  }
`;

const ADD_GAME = gql`
  mutation AddGame($game: GameInput!) {
    addGame(game: $game) {
      id
      title
      platform
    }
  }
`;

const UPDATE_GAME = gql`
  mutation updateGame($id: ID!, $edits: UpdateGameInput!) {
    updateGame(id: $id, edits: $edits) {
      title
      platform
    }
  }
`;

const DELETE_GAME = gql`
  mutation deleteGame($deleteGameId: ID!) {
    deleteGame(id: $deleteGameId) {
      id
      title
    }
  }
`;

const App = () => {
  const { loading, error, data, refetch } = useQuery(GET_GAMES);
  const [addGame] = useMutation(ADD_GAME);
  const [updateGame] = useMutation(UPDATE_GAME);
  const [deleteGame] = useMutation(DELETE_GAME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const addNewGame = () => {
    addGame({
      variables: {
        game: {
          title: `New Game ${Date.now()}`,
          platform: ["PC", "Console"]
        }
      }
    }).then((res) => {
      console.log(res);
      refetch();
    });
  };

  const editGame = (id, game) => {
    console.log(id, game);
    updateGame({
      variables: {
        id,
        edits: {
          title: game.title + " updated",
          platform: game.platform
        }
      }
    }).then((res) => {
      console.log(res);
      refetch();
    });
  };
  const destroyGame = (id) => {
    deleteGame({
      variables: {
        deleteGameId: id
      }
    }).then((res) => {
      console.log(res);
      refetch();
    });
  };
  return (
    <div>
      <div className="flex justify-end m-4">
        <button
          onClick={addNewGame}
          className="bg-violet-500 p-2 rounded-lg text-white"
        >
          Add Game
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.games.map((game) => {
          return (
            <div
              key={game.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <h2 className="mb-4 text-xl font-bold">{game.title}</h2>
              <p className="bg-gray-200 p-2 rounded-lg w-fit mb-4">
                {game.platform.join(", ")}
              </p>
              <h4 className="mb-2">Reviews:</h4>
              {game.reviews.map((review) => {
                return (
                  <div
                    key={review.id}
                    className="flex justify-between bg-gray-200 p-2 rounded-lg mb-1"
                  >
                    <p>
                      {review.rating} : {review.content}
                    </p>
                    <p>{review.author.name}</p>
                  </div>
                );
              })}
              <div className="flex justify-end mt-4 gap-4">
                <button
                  onClick={() => {
                    editGame(game.id, game);
                  }}
                  className="text-yellow-500"
                >
                  Update
                </button>
                <button
                  onClick={() => destroyGame(game.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
