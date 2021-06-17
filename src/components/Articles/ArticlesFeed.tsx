import React, { useEffect, useState } from "react";
import { APIEndpoints, makeAPIRequest } from "../../utils/networkRequest";
import Article from "./Article";
import { ScrollingContainer } from "./ArticlesFeed.styled";

interface ArticleThumbnail {
  height: number,
  size: "small" | "medium" | "large",
  url: string,
  width: number,
}

interface ArticleAuthor {
  name?: string
  thumbnail?: string
}

interface CommentCount {
  id: string
  count: number
}

export interface ArticleType {
  id: string
  headline: string
  smallThumbnail: ArticleThumbnail
  mediumThumbnail: ArticleThumbnail
  largeThumbnail: ArticleThumbnail
  description: string | null
  authors: ArticleAuthor[]
  networks: string[]
  commentCount: number
}

const ArticlesFeed: React.FC = () => {
  const [articles, setArticles] = useState<ArticleType[]>([])

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
      console.log("fetched")
      const articlesResponse = await makeAPIRequest(APIEndpoints.ARTICLES, "GET")

      const articleIds = articlesResponse.data.map((article: any) => article.contentId)
      const commentCounts: CommentCount[] = await getCommentCounts(articleIds)

      // TODO cleaner way to map thumbnails
      const mappedArticles: ArticleType[] = articlesResponse.data.map((article: any) => {
        // TODO this could be optimized
        const comment = commentCounts.find((comment) => article.contentId === comment.id)

        return {
          id: article.contentId,
          headline: article.metadata.headline,
          smallThumbnail: article.thumbnails[0],
          mediumThumbnail: article.thumbnails[1],
          largeThumbnail: article.thumbnails[2],
          description: article.metadata.description,
          authors: article.authors.length ? article.authors : [],
          networks: article.metadata.networks.length ? article.metadata.networks : [],
          commentCount: comment?.count,
        }
      })

      setArticles(mappedArticles)
    }

    getArticles()
  }, [])

  return (
    <ScrollingContainer>
      {articles.length ? (
        articles.map((article: ArticleType) => {
          return (
            <Article article={article} key={article.id} />
          )
        })
      ): null}
    </ScrollingContainer>
  )
};

export default ArticlesFeed;
