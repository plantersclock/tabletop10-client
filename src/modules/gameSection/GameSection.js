import React from "react";
import GameInfo from "../gameInfo/GameInfo";
import RatingInfo from "../ratingInfo/RatingInfo";

const GameSection = ({ rank, gameInfo, ratings }) => {
  console.log(ratings);
  return (
    <div>
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
