import React from "react"
import { ArticleCardContainer, HeadlineContainer, HeadlineText, Thumbnail, ThumbnailContainer } from "./Article.styled"
import { ArticleType } from "./ArticlesFeed"

type ArticleProps = {
  article: ArticleType
}

const Article: React.FC<ArticleProps> = ({ article: { headline, smallThumbnail } }) => {
  console.log("headline: ", headline)
  return (
    <ArticleCardContainer>
      <HeadlineContainer>
        <HeadlineText>
          {headline}
        </HeadlineText>
        <ThumbnailContainer>
          <Thumbnail
            source={{ uri: smallThumbnail.url }}
            width={smallThumbnail.width}
            height={smallThumbnail.height}
          />
        </ThumbnailContainer>
      </HeadlineContainer>
    </ArticleCardContainer>
  )
}

export default Article