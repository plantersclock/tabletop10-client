import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useRouteMatch } from "react-router-dom";
import { getAllReviewers } from "../../api/Queries";

const Reviewer = () => {
  const [reviewers, setReviewers] = useState(null);
  let { path } = useRouteMatch();

  const reviewerQuery = useQuery("reviewers", getAllReviewers);

  useEffect(() => {
    if (reviewerQuery?.data?.data) {
      setReviewers(reviewerQuery.data.data);
    }
  }, [reviewerQuery]);
  return (
    <div>
      {reviewers &&
        reviewers.map((reviewer) => (
          <div key={reviewer.name}>
            {reviewer.name} - {reviewer.channel.name}
          </div>
        ))}
      <Link
        className="inline-block mt-6 py-1 px-2 text-white bg-green-500 hover:bg-green-600 rounded"
        to={`${path}/create`}
      >
        Create Reviewer
      </Link>
    </div>
  );
};

export default Reviewer;
