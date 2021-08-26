import React, { useEffect, useState } from "react";
import Navbar from "../../modules/navbar/NavBar";
import GameInfo from "../../modules/gameInfo/GameInfo";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getAllRatings, getGameInfo } from "../../api/Queries";
import _ from "lodash";

const getScore = (gameName, gameId, ratings) => {
  let gameRatings = ratings.filter((rating) => rating.game.includes(gameName));
  gameRatings = gameRatings.map((rating) => 11 - rating.rank);
  let sum = gameRatings.reduce((a, b) => a + b, 0);
  let listScore = gameRatings.length * 5;
  let score = sum + listScore;
  return { gameName, gameId, score };
};

const getTop10 = (scoredGames) => {
  let top10 = [];
  let rank = 1;

  for (let i = 0; i < scoredGames.length; i++) {
    if (top10[i - 1]) {
      if (top10[i - 1].score === scoredGames[i].score) {
        top10.push({ ...scoredGames[i], rank });
      } else {
        rank++;
        if (rank > 10) return;
        top10.push({ ...scoredGames[i], rank });
      }
    } else {
      top10.push({ ...scoredGames[i], rank });
    }
  }

  return top10;
};

const Top10 = () => {
  let { year } = useParams();
  const [ratings, setRatings] = useState(null);
  const [top10Games, setTop10Games] = useState(null);
  const [uniqueIds, setUniqueIds] = useState([]);
  const [gameInfo, setGameInfo] = useState(null);
  const { data } = useQuery("ratings", getAllRatings);

  useEffect(() => {
    if (data?.data) {
      let filteredData = data.data;
      filteredData = filteredData.filter(
        (rating) => rating.year === parseInt(year)
      );
      setRatings(filteredData);
    }
  }, [data, year]);

  useEffect(() => {
    if (!ratings) return;
    let uniqueGameIds = [
      ...new Set(
        ratings.map((item) => {
          return item.bgAtlasId;
        })
      ),
    ];
    setUniqueIds(uniqueGameIds);
    let uniqueGames = _.uniqBy(ratings, "game");
    console.log(uniqueGames);
    let gamesWithScores = uniqueGames.map((game) => {
      return getScore(game.game, game.bgAtlasId, ratings);
    });
    let orderedScoredGames = _.orderBy(
      gamesWithScores,
      ["score", "gameName"],
      ["desc", "asc"]
    );
    setTop10Games(getTop10(orderedScoredGames));
  }, [ratings]);

  const gameInfoQuery = useQuery(
    ["bgAtlasGames", year],
    () => getGameInfo(uniqueIds),
    {
      enabled: uniqueIds.length > 0,
    }
  );

  useEffect(() => {
    if (!gameInfoQuery?.data?.data?.data?.games) return;
    console.log(gameInfoQuery.data.data.data.games);

    setGameInfo(gameInfoQuery.data.data.data.games);
  }, [gameInfoQuery]);

  console.log(top10Games);

  return (
    <div className="bg-theme-gray-900 font-teko min-h-screen text-theme-gray-100">
      <Navbar />
      <div className="pl-48">
        {top10Games &&
          gameInfo &&
          top10Games.map((game) => (
            <GameInfo
              gameId={game.gameId}
              rank={game.rank}
              gameInfo={gameInfo.find(({ id }) => id === game.gameId)}
            />
          ))}
      </div>
    </div>
  );
};

export default Top10;
