import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { APIEndpoints, makeAPIRequest } from "../../utils/networkRequest";
import Article from "./Article";
import { ScrollingContainer } from "./ArticlesFeed.styled";

interface ArticleThumbnail {
  height: number,
  size: "small" | "medium" | "large",
  url: string,
  width: number,
}

export interface ArticleType {
  headline: string
  smallThumbnail: ArticleThumbnail
  mediumThumbnail: ArticleThumbnail
  largeThumbnail: ArticleThumbnail
}

const ArticlesFeed: React.FC = () => {
  const [articles, setArticles] = useState<ArticleType[]>([])

  useEffect(() => {
    const getArticles = async () => {
      console.log("fetched")
      const articlesResponse = await makeAPIRequest(APIEndpoints.ARTICLES, "GET")

      // TODO cleaner way to map thumbnails
      const mappedArticles: ArticleType[] = articlesResponse.data.map((article: any) => {
        return {
          headline: article.metadata.headline,
          smallThumbnail: article.thumbnails[0],
          mediumThumbnail: article.thumbnails[1],
          largeThumbnail: article.thumbnails[2]
        }
      })

      console.log("mappedArticles: ", mappedArticles)

      console.log("articlesResponse: ", articlesResponse.data[0])
      setArticles(mappedArticles)
    }

    getArticles()
  }, [])

  return (
    <ScrollingContainer>
      {articles.length ? (
        articles.map((article: ArticleType) => {
          return (
            // <Text>{article?.metadata?.headline}</Text>
            <Article article={article} />
          )
        })
      ): null}
    </ScrollingContainer>
  )
};

export default ArticlesFeed;
