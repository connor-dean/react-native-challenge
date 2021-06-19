import React from "react"
import { APIEndpoints } from "../utils/networkRequest"
import ContentFeed from "./ContentFeed"

const ArticlesFeed: React.FC = () => {
  return <ContentFeed contentType={APIEndpoints.ARTICLES} />
}

export default ArticlesFeed
