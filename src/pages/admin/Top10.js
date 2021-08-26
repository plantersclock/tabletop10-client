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

const getTop10 = (games) => {
  let top10 = [];
  let rank = 1;
  let scoredGames = _.orderBy(games, ["score", "gameName"], ["desc", "asc"]);

  for (let i = 0; i < scoredGames.length; i++) {
    if (top10[i - 1]) {
      if (top10[i - 1].score === scoredGames[i].score) {
        top10.push({ ...scoredGames[i], rank });
      } else {
        rank++;
        if (rank > 10) return top10;
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

      let uniqueFilteredData = _.uniqBy(filteredData, "game");
      let gamesWithScores = uniqueFilteredData.map((game) => {
        return getScore(game.game, game.bgAtlasId, filteredData);
      });
      let top10List = getTop10(gamesWithScores);
      let uniqueGameIds = [
        ...new Set(
          top10List.map((item) => {
            return item.gameId;
          })
        ),
      ];
      setUniqueIds(uniqueGameIds);
      setTop10Games(top10List);
    }
  }, [data, year]);

  const gameInfoQuery = useQuery(
    ["bgAtlasGames", year],
    () => getGameInfo(uniqueIds),
    {
      enabled: uniqueIds.length > 0,
    }
  );

  useEffect(() => {
    if (!gameInfoQuery?.data?.data?.data?.games) return;

    setGameInfo(gameInfoQuery.data.data.data.games);
  }, [gameInfoQuery]);

  return (
    <div className="bg-theme-gray-900 font-teko min-h-screen text-theme-gray-100">
      <Navbar />
      <div className="pl-48">
        {top10Games &&
          gameInfo &&
          top10Games.map((game) => (
            <GameInfo
              key={game.gameId}
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
