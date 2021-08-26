import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useRouteMatch } from "react-router-dom";
import { getAllRatings } from "../../api/Queries";

const Rating = () => {
  const [ratings, setRatings] = useState(null);
  let { path } = useRouteMatch();

  const ratingQuery = useQuery("ratings", getAllRatings);

  useEffect(() => {
    if (ratingQuery?.data?.data) {
      setRatings(ratingQuery.data.data);
    }
  }, [ratingQuery]);
  return (
    <div>
      <div className="max-h-72 overflow-y-auto">
        {ratings &&
          ratings.map((rating) => (
            <div key={rating._id}>
              {rating.year} - {rating.reviewer.name} - {rating.rank} -{" "}
              {rating.game}
            </div>
          ))}
      </div>
      <Link
        className="inline-block mt-6 py-1 px-2 text-white bg-green-500 hover:bg-green-600 rounded"
        to={`${path}/create`}
      >
        Create Rating
      </Link>
    </div>
  );
};

export default Rating;
