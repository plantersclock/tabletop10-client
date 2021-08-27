import React from "react";

const RatingRow = ({ rating }) => {
  return (
    <div className="grid grid-cols-3 text-3xl mt-4">
      <div>{rating.reviewer.name}</div>
      <div
        className="cursor-pointer hover:text-gray-500"
        onClick={() => window.open(`${rating.reviewer.channel.url}`, "_blank")}
      >
        {rating.reviewer.channel.name}
      </div>
      <div className="text-theme-orange-500">{rating.rank} / 10</div>
    </div>
  );
};

export default RatingRow;
