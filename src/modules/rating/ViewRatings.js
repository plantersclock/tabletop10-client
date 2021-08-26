import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getAllRatings } from "../../api/Queries";

const ViewRatings = ({ reviewerName = null, year = null }) => {
  const [ratings, setRatings] = useState(null);
  const ratingQuery = useQuery("ratings", getAllRatings);

  useEffect(() => {
    if (!ratingQuery?.data?.data) return;
    let filteredData = ratingQuery.data.data;
    if (filteredData && year) {
      filteredData = filteredData.filter(
        (rating) => rating.year === parseInt(year)
      );
    }
    if (filteredData && reviewerName) {
      filteredData = filteredData.filter((rating) =>
        rating.reviewer.name.includes(reviewerName)
      );
    }
    setRatings(filteredData);
  }, [ratingQuery, year, reviewerName]);

  return (
    <div>
      {ratings &&
        ratings.map((rating) => (
          <div key={rating._id}>
            {rating.year} - {rating.reviewer.name} - {rating.rank} -{" "}
            {rating.game}
          </div>
        ))}
    </div>
  );
};

export default ViewRatings;
