import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createRating,
  getAllReviewers,
  searchGameName,
} from "../../api/Queries";
import { DebounceInput } from "react-debounce-input";
import ViewRatings from "./ViewRatings";

const CreateRating = () => {
  const reviewerIdRef = useRef();
  const gameRef = useRef();
  const [error, setError] = useState();
  const [year, setYear] = useState(null);
  const [rank, setRank] = useState(null);
  const [reviewerId, setReviewerId] = useState(null);

  const [reviewers, setReviewers] = useState(null);
  const [games, setGames] = useState(null);
  const [gameName, setGameName] = useState(null);

  const queryClient = useQueryClient();

  const getReviewerName = (id) => {
    if (!reviewers) return;
    if (!id) return;

    return reviewers.find((reviewer) => {
      return reviewer._id === id;
    })?.name;
  };

  const reviewerQuery = useQuery("reviewers", getAllReviewers);

  useEffect(() => {
    if (reviewerQuery?.data?.data) {
      setReviewers(reviewerQuery.data.data);
    }
  }, [reviewerQuery]);

  const gameSearchQuery = useQuery(
    ["gameSearch", gameName],
    () => searchGameName(gameName),
    {
      enabled: !!gameName,
    }
  );

  console.log(games);

  useEffect(() => {
    if (gameSearchQuery?.data?.data?.data?.games) {
      setGames(gameSearchQuery.data.data.data.games);
    }
  }, [gameSearchQuery]);

  // Mutations
  const ratingMutation = useMutation(createRating, {
    onError: async (error) => {
      console.log(error);
      setError(error.response.data.errorMessage);
    },
    onSuccess: async () => {
      console.log("Added");
      setGameName("");
      setRank((prevRank) => parseInt(prevRank) + 1);
      queryClient.invalidateQueries("ratings");
    },
  });

  const submitRating = (e) => {
    e.preventDefault();
    const game = games.find((game) => {
      return game.id === gameRef.current.value;
    }).name;

    const body = {
      year,
      rank: rank,
      reviewer: reviewerIdRef.current.value,
      game: game,
      bgAtlasId: gameRef.current.value,
    };

    ratingMutation.mutate(body);
  };
  return (
    <div>
      <form onSubmit={submitRating}>
        <div className="flex flex-col">
          <label htmlFor="ratingYear">Year</label>
          <input
            id="ratingYear"
            type="number"
            className="rounded-md bg-gray-50 mt-1"
            onChange={(e) => setYear(e.target.value)}
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="reviewerId">Reviewer</label>

          <select
            id="reviewerId"
            type="url"
            className="rounded-md bg-gray-50 mt-1"
            ref={reviewerIdRef}
            onChange={(e) => setReviewerId(e.target.value)}
            required
          >
            <option value={null}>--select--</option>
            {reviewers &&
              reviewers.map((reviewer) => (
                <option value={reviewer._id}>{reviewer.name}</option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="ratingRank">Rank</label>
          <input
            id="ratingRank"
            type="number"
            className="rounded-md bg-gray-50 mt-1"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            required
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="reviewerId">Game</label>
          <DebounceInput
            id="gameSearch"
            debounceTimeout={300}
            type="text"
            autoComplete="off"
            className="rounded-md bg-gray-50 mt-1"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          ></DebounceInput>

          {games && (
            <select
              id="gameId"
              className="rounded-md bg-gray-50 mt-1"
              ref={gameRef}
              required
            >
              {games.map((game) => (
                <option value={game.id}>
                  {game.name} - {game.year_published}
                </option>
              ))}
            </select>
          )}
        </div>
        <button
          type="submit"
          className="mt-6 bg-green-500 text-white font-medium rounded-lg py-1 px-2 hover:bg-green-600"
        >
          Submit
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
      <ViewRatings year={year} reviewerName={getReviewerName(reviewerId)} />
    </div>
  );
};

export default CreateRating;
