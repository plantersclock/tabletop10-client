import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { createReviewer, getAllChannels } from "../../api/Queries";
import { useHistory } from "react-router-dom";

const CreateReviewer = () => {
  const nameRef = useRef();
  const channelIdRef = useRef();
  const [error, setError] = useState();

  const [channels, setChannels] = useState(null);

  const channelQuery = useQuery("channels", getAllChannels);

  useEffect(() => {
    if (channelQuery?.data?.data) {
      setChannels(channelQuery.data.data);
    }
  }, [channelQuery]);

  // initiate history
  const history = useHistory();
  // Mutations
  const reviewerMutation = useMutation(createReviewer, {
    onError: async (error) => {
      console.log(error);
      setError(error.response.data.errorMessage);
    },
    onSuccess: async () => {
      history.goBack();
    },
  });

  const submitReviewer = (e) => {
    e.preventDefault();

    reviewerMutation.mutate({
      name: nameRef.current.value,
      channel: channelIdRef.current.value,
    });
  };
  return (
    <div>
      <form onSubmit={submitReviewer}>
        <div className="flex flex-col">
          <label htmlFor="ReviewerName">Reviewer</label>
          <input
            id="ReviewerName"
            type="text"
            className="rounded-md bg-gray-50 mt-1"
            ref={nameRef}
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="channelId">Channel</label>

          <select
            id="channelId"
            type="url"
            className="rounded-md bg-gray-50 mt-1"
            ref={channelIdRef}
            required
          >
            {channels &&
              channels.map((channel) => (
                <option value={channel._id}>{channel.name}</option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-6 bg-green-500 text-white font-medium rounded-lg py-1 px-2 hover:bg-green-600"
        >
          Submit
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default CreateReviewer;
