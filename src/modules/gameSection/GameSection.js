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
      <GameInfo
        key={gameInfo.gameId}
        gameId={gameInfo.gameId}
        rank={rank}
        gameInfo={gameInfo}
      />

      <RatingInfo ratings={ratings} />
    </div>
  );
};

export default GameSection;
