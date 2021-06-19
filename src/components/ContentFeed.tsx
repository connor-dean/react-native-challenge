import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import FeedCard from "./FeedCard";

interface ContentThumbnail {
  height: number,
  size: "small" | "medium" | "large",
  url: string,
  width: number,
}

interface ContentAuthor {
  name?: string
  thumbnail?: string
}

export interface CommentCount {
  id: string
  count: number
}

export enum ContentType {
  Article = "article",
  Video = "video"
}

export interface ContentFeedDTO {
  id: string
  articleType: ContentType
  headline: string
  smallThumbnail: ContentThumbnail
  mediumThumbnail: ContentThumbnail
  largeThumbnail: ContentThumbnail
  description: string | null
  authors?: ContentAuthor[]
  networks: string[]
  commentCount: number
  publishDate: string
}

type ContentFeedProps = {
  feedContent: ContentFeedDTO[]
}

const ContentFeed: React.FC<ContentFeedProps> = ({ feedContent }) => {
  return (
    <ScrollView>
      {feedContent.length ? (
        feedContent.map((content: ContentFeedDTO) => {
          return (
            <FeedCard content={content} key={content.id} />
          )
        })
      ): null}
    </ScrollView>
  );
};

export default ContentFeed;
