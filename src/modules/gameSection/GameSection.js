import React from "react";
import GameInfo from "../gameInfo/GameInfo";

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
    </div>
  );
};

export default GameSection;
