import { sanitize } from "dompurify";

import {
  HeartIcon,
  ScaleIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import LazyLoad from "react-lazyload";

const zeroPad = (num, places) => String(num).padStart(places, "0");

const GameInfo = ({ rank = null, gameInfo }) => {
  return (
    <>
      {gameInfo && (
        <div className="container max-w-5xl bg-theme-gray-700 mx-auto px-24 py-12 mt-16 shadow-lg">
          <div className="text-8xl relative">
            <div className="absolute text-11xl text-theme-orange-500 -top-24 -right-10">
              {zeroPad(rank, 2)}
            </div>
            <div className="max-w-2xl">{gameInfo.name}</div>
            <LazyLoad offset={200}>
              <div className="overflow-hidden absolute overflow-hidden -left-80 top-0 w-72 -mt-4 ml-2 opacity-20 filter blur-2xl">
                <img
                  className="transform scale-150 w-72 object-cover"
                  src={gameInfo.images.thumb}
                  alt="backgroundBlur"
                />
              </div>
              <div className="overflow-hidden absolute overflow-hidden -left-72 top-0 w-60 mt-2 bg-white border-8 border-theme-gray-500">
                <img
                  className="transform scale-145"
                  src={gameInfo.images.medium}
                  alt="gameImage"
                />
              </div>
            </LazyLoad>
          </div>

          <div
            className="font-sans mt-4"
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
