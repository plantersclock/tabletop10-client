import React, { useEffect } from "react";
import GameInfo from "../gameInfo/GameInfo";
import RatingInfo from "../ratingInfo/RatingInfo";
import { useInView } from "react-intersection-observer";

const GameSection = ({ rank, gameInfo, ratings, setDisplayRank }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setDisplayRank(rank);
    }
  }, [inView, rank, setDisplayRank]);
  return (
    <div className="relative">
      <div className="absolute top-96" ref={ref}></div>
      <div className="relative max-w-5xl mx-auto">
        <div className="relative z-50">
          <GameInfo
            key={gameInfo.gameId}
            gameId={gameInfo.gameId}
            rank={rank}
            gameInfo={gameInfo}
          />

          <RatingInfo ratings={ratings} />
        </div>
        <div className="absolute h-full top-5 left-5 bg-theme-gray-50 container z-10"></div>
      </div>
    </div>
  );
};

export default GameSection;
