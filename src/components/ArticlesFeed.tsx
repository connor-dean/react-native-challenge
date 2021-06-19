import React from "react"
import { useState, useEffect } from "react"
import { makeAPIRequest, APIEndpoints } from "../utils/networkRequest"
import ContentFeed, { CommentCount, ContentFeedDTO } from "./ContentFeed"

const ArticlesFeed: React.FC = () => {
  const [articles, setArticles] = useState<ContentFeedDTO[]>([])

  useEffect(() => {
    const getCommentCounts = async (articleIds: string[]): Promise<CommentCount[]> => {
      let queryString = "?ids="
      for (const articleId of articleIds) {
        queryString += `${articleId},`
      }

      const comments = await makeAPIRequest(APIEndpoints.COMMENT_COUNT, "GET", queryString)
      return comments.content
    }

    const getArticles = async () => {
      const articlesResponse = await makeAPIRequest(APIEndpoints.ARTICLES, "GET")

      const articleIds = articlesResponse.data.map((article: any) => article.contentId)
      const commentCounts: CommentCount[] = await getCommentCounts(articleIds)

      const mappedArticles: ContentFeedDTO[] = articlesResponse.data.map((article: any) => {
        const comment = commentCounts.find((comment) => article.contentId === comment.id)

        /**
         * Questions:
         * - Would the API always return these thumbnails in this order or would they have to be manually mapped?
         */

        return {
          id: article.contentId,
          contentType: article.contentType,
          headline: article.metadata.headline,
          smallThumbnail: article.thumbnails[0],
          mediumThumbnail: article.thumbnails[1],
          largeThumbnail: article.thumbnails[2],
          description: article.metadata.description,
          authors: article.authors.length ? article.authors : [],
          networks: article.metadata.networks.length ? article.metadata.networks : [],
          commentCount: comment?.count,
          publishDate: article.metadata.publishDate
        }
      })

      setArticles(mappedArticles)
    }

    getArticles()
  }, [])

  return (
    <ContentFeed feedContent={articles} />
  )
}

export default ArticlesFeed
