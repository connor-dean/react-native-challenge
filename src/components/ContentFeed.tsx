import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { makeAPIRequest, APIEndpoints } from "../utils/networkRequest";
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

export interface ContentFeedDTO {
  id: string
  articleType: APIEndpoints
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
  contentType: APIEndpoints.ARTICLES | APIEndpoints.VIDEOS
}

const ContentFeed: React.FC<ContentFeedProps> = ({ contentType }) => {
  const [contentItems, setContentItems] = useState<ContentFeedDTO[]>([])

  useEffect(() => {
    const getCommentCounts = async (contentIds: string[]): Promise<CommentCount[]> => {
      let queryString = "?ids="
      for (const contentId of contentIds) {
        queryString += `${contentId},`
      }

      const comments = await makeAPIRequest(APIEndpoints.COMMENT_COUNT, "GET", queryString)
      return comments.content
    }

    const getContent = async () => {
      const contentResponse = await makeAPIRequest(contentType, "GET")

      const contentIds = contentResponse.data.map((content: any) => content.contentId)
      const commentCounts: CommentCount[] = await getCommentCounts(contentIds)

      const mappedArticles: ContentFeedDTO[] = contentResponse.data.map((content: any) => {
        const comment = commentCounts.find((comment) => content.contentId === comment.id)

        /**
         * Questions:
         * - Would the API always return these thumbnails in this order or would they have to be manually mapped?
         */

        return {
          id: content.contentId,
          contentType: content.contentType,
          headline: content.metadata.headline,
          smallThumbnail: content.thumbnails[0],
          mediumThumbnail: content.thumbnails[1],
          largeThumbnail: content.thumbnails[2],
          description: content.metadata.description,
          ...(content.authors && { authors: content.authors }),
          networks: content.metadata.networks.length ? content.metadata.networks : [],
          commentCount: comment?.count,
          publishDate: content.metadata.publishDate
        }
      })

      setContentItems(mappedArticles)
    }

    getContent()
  }, [])

  return (
    <ScrollView>
      {contentItems.length ? (
        contentItems.map((content: ContentFeedDTO) => {
          return (
            <FeedCard content={content} key={content.id} />
          )
        })
      ): null}
    </ScrollView>
  );
};

export default ContentFeed;
