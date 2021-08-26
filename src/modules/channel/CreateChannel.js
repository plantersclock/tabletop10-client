import React, { useState, useRef } from "react";
import { useMutation } from "react-query";
import { createChannel } from "../../api/Queries";
import { useHistory } from "react-router-dom";

const CreateChannel = () => {
  const nameRef = useRef();
  const urlRef = useRef();
  const [error, setError] = useState();
  // initiate history
  const history = useHistory();
  // Mutations
  const channelMutation = useMutation(createChannel, {
    onError: async (error) => {
      console.log(error);
      setError(error.response.data.errorMessage);
    },
    onSuccess: async () => {
      history.goBack();
    },
  });

  const submitChannel = (e) => {
    e.preventDefault();

    channelMutation.mutate({
      name: nameRef.current.value,
      url: urlRef.current.value,
    });
  };
  return (
    <div>
      <form onSubmit={submitChannel}>
        <div className="flex flex-col">
          <label htmlFor="channelName">Channel</label>
          <input
            id="channelName"
            type="text"
            className="rounded-md bg-gray-50 mt-1"
            ref={nameRef}
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="channelUrl">URL</label>

          <input
            id="channelUrl"
            type="url"
            className="rounded-md bg-gray-50 mt-1"
            ref={urlRef}
            required
          ></input>
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

export default CreateChannel;
