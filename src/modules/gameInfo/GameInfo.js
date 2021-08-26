import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { sanitize } from "dompurify";

import { getGameInfo } from "../../api/Queries";

import {
  HeartIcon,
  ScaleIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/outline";

const GameInfo = ({ gameId = "TAAifFP590" }) => {
  const [gameInfo, setGameInfo] = useState(null);
  const gameInfoQuery = useQuery(["game", gameId], () => getGameInfo(gameId), {
    enabled: !!gameId,
  });

  useEffect(() => {
    if (!gameInfoQuery?.data?.data?.data?.games[0]) return;
    console.log(gameInfoQuery.data.data.data.games[0]);

    setGameInfo(gameInfoQuery.data.data.data.games[0]);
  }, [gameInfoQuery]);

  return (
    <>
      {gameInfo && (
        <div className="container max-w-5xl bg-theme-gray-500 mx-auto bg-opacity-25 px-24 py-12">
          <div className="text-7xl relative ">
            {gameInfo.name}
            <div className="overflow-hidden absolute overflow-hidden -left-80 top-0 w-72 -mt-4 ml-2 opacity-20 filter blur-2xl">
              <img
                className="transform scale-150 w-72 object-cover"
                src={gameInfo.images.thumb}
              />
            </div>
            <div className="overflow-hidden absolute overflow-hidden -left-72 top-0 w-60 mt-2">
              <img
                className="transform scale-150"
                src={gameInfo.images.medium}
              />
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: sanitize(gameInfo.description) }}
          ></div>

          <div className="flex justify-between mt-10">
            <div className="flex flex-col items-center">
              <UsersIcon className="h-10 text-theme-gray-300" />
              <div className="text-theme-gray-100 text-2xl">
                {gameInfo.min_players} - {gameInfo.max_players}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <ClockIcon className="h-10 text-theme-gray-300" />
              <div className="text-theme-gray-100 text-2xl">
                {gameInfo.min_playtime} - {gameInfo.max_playtime}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <ScaleIcon className="h-10 text-theme-gray-300" />
              <div className="text-theme-gray-100 text-2xl">
                {gameInfo.average_learning_complexity.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <HeartIcon className="h-10 text-theme-gray-300" />
              <div className="text-theme-gray-100 text-2xl">
                {gameInfo.average_user_rating.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameInfo;
