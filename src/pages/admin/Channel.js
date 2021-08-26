import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useRouteMatch } from "react-router-dom";
import { getAllChannels } from "../../api/Queries";

const Channel = () => {
  const [channels, setChannels] = useState(null);
  let { path } = useRouteMatch();

  const channelQuery = useQuery("channels", getAllChannels);

  useEffect(() => {
    if (channelQuery?.data?.data) {
      setChannels(channelQuery.data.data);
    }
  }, [channelQuery]);
  return (
    <div>
      {channels &&
        channels.map((channel) => (
          <div key={channel.name}>
            {channel.name} - {channel.url}
          </div>
        ))}
      <Link
        className="inline-block mt-6 py-1 px-2 text-white bg-green-500 hover:bg-green-600 rounded"
        to={`${path}/create`}
      >
        Create Channel
      </Link>
    </div>
  );
};

export default Channel;
