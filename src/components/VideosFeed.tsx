import React, { useEffect, useState } from "react";
import { makeAPIRequest, APIEndpoints } from "../utils/networkRequest";
import ContentFeed, { CommentCount, ContentFeedDTO } from "./ContentFeed";

const VideosFeed: React.FC = () => {
  const [videos, setVideos] = useState<ContentFeedDTO[]>([])

  useEffect(() => {
    const getCommentCounts = async (videoIds: string[]): Promise<CommentCount[]> => {
      let queryString = "?ids="
      for (const videoId of videoIds) {
        queryString += `${videoId},`
      }

      const comments = await makeAPIRequest(APIEndpoints.COMMENT_COUNT, "GET", queryString)
      return comments.content
    }

    const getvideos = async () => {
      const videosResponse = await makeAPIRequest(APIEndpoints.VIDEOS, "GET")
      console.log("videosRepsonse: ", videosResponse)

      const articleIds = videosResponse.data.map((article: any) => article.contentId)
      const commentCounts: CommentCount[] = await getCommentCounts(articleIds)

      // TODO cleaner way to map thumbnails
      const mappedVideos: ContentFeedDTO[] = videosResponse.data.map((article: any) => {
        // TODO this could be optimized
        const comment = commentCounts.find((comment) => article.contentId === comment.id)

        return {
          id: article.contentId,
          contentType: article.contentType,
          headline: article.metadata.headline,
          smallThumbnail: article.thumbnails[0],
          mediumThumbnail: article.thumbnails[1],
          largeThumbnail: article.thumbnails[2],
          description: article.metadata.description,
          networks: article.metadata.networks.length ? article.metadata.networks : [],
          commentCount: comment?.count,
          publishDate: article.metadata.publishDate
        }
      })

      setVideos(mappedVideos)
    }

    getvideos()
  }, [])

  return (
    <ContentFeed feedContent={videos} />
  );
};

export default VideosFeed;
