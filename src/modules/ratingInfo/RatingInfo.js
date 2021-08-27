import React from "react";
import RatingRow from "./RatingRow";

const RatingInfo = ({ ratings }) => {
  return (
    <div>
      <div className="container max-w-5xl mx-auto py-12 mt-6">
        <div className="text-theme-orange-500 text-6xl border-b-2">
          Reviewer Rankings
        </div>
        <div className="mt-8">
          {ratings && ratings.map((rating) => <RatingRow rating={rating} />)}
        </div>
      </div>
    </div>
  );
};

export default RatingInfo;
