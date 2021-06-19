import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
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

const FETCH_QUANTITY = 20

const ContentFeed: React.FC<ContentFeedProps> = ({ contentType }) => {
  const [contentItems, setContentItems] = useState<ContentFeedDTO[]>([])
  const [queryStartIndex, setQuertStartIndex] = useState<number>(0)

  const getCommentCounts = async (contentIds: string[]): Promise<CommentCount[]> => {
    let queryString = "?ids="
    for (const contentId of contentIds) {
      queryString += `${contentId},`
    }

    const comments = await makeAPIRequest(APIEndpoints.COMMENT_COUNT, "GET", queryString)
    return comments.content
  }

  const getContent = async () => {
    const queryString = `?startIndex=${queryStartIndex}&count=${FETCH_QUANTITY}`

    const contentResponse = await makeAPIRequest(contentType, "GET", queryString)

    const contentIds = contentResponse.data.map((content: any) => content.contentId)
    const commentCounts: CommentCount[] = await getCommentCounts(contentIds)

    const mappedContent: ContentFeedDTO[] = contentResponse.data.map((content: any) => {
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

    setContentItems((prevMappedContent) => [...prevMappedContent, ...mappedContent])
  }

  useEffect(() => {
    getContent()
  }, [queryStartIndex])

  const renderCard = (contentItem: ContentFeedDTO): JSX.Element => (
    <FeedCard content={contentItem} />
  )

  return (
    <FlatList
      data={contentItems}
      renderItem={({ item }) => renderCard(item)}
      onEndReachedThreshold={0.75}
      onEndReached={() => setQuertStartIndex(queryStartIndex + FETCH_QUANTITY)}
    />
  )
};

export default ContentFeed;
