import React from "react";

const zeroPad = (num, places) => String(num).padStart(places, "0");

const FixedYearRank = ({ year, rank }) => {
  return (
    <div className="fixed left-10 bottom-0">
      <div className="absolute left-4 bottom-56 text-8xl font-light text-theme-gray-300 leading-none transform -rotate-90 -ml-8">
        {year}
      </div>
      <div className="text-13xl text-theme-gray-500 mt-7 leading-none absolute bottom-0">
        {zeroPad(rank, 2)}
      </div>
      <div className="absolute h-64 w-0 border-r border-theme-gray-500 left-44 bottom-12"></div>
    </div>
  );
};

export default FixedYearRank;
