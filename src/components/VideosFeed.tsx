import React from "react";
import { APIEndpoints } from "../utils/networkRequest";
import ContentFeed from "./ContentFeed";

const VideosFeed: React.FC = () => {
  return <ContentFeed contentType={APIEndpoints.VIDEOS} />
};

export default VideosFeed;
