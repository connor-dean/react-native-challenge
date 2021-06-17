import React from "react"
import {
  ArticleCardContainer,
  HeadlineContainer,
  HeadlineText,
  Thumbnail,
  DescriptionAuthorContainer,
  ThumbnailContainer,
  Description,
  AuthorContainer,
  AuthorThumbnail,
  ByText,
  AuthorName,
  BottomContainer,
  NetworkLabelContainer,
  NetworkLabel,
  CommentCount
} from "./Article.styled"
import { ArticleType } from "./ArticlesFeed"

type ArticleProps = {
  article: ArticleType
}

const Article: React.FC<ArticleProps> = ({
  article: {
    headline,
    smallThumbnail,
    description,
    authors,
    networks,
    commentCount
  }
}) => {
  console.log("headline: ", headline)
  console.log("authors: ", authors)
  console.log("commentCount: ", commentCount)
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
        <DescriptionAuthorContainer>
          {description && (
            <Description>
              {description}
            </Description>
          )}
          {/*
            Would typically try to ask how we would want to display
            multiple authors/networks or how to prioritize.
          */}
          {authors.length > 0 && (
            <AuthorContainer>
              {!!authors[0].thumbnail && (
                <AuthorThumbnail source={{ uri: authors[0].thumbnail }} />
              )}
              <ByText>By </ByText>
              <AuthorName>
                {authors[0].name}
              </AuthorName>
            </AuthorContainer>
          )}
          <BottomContainer>
            {networks.length > 0 && (
              <NetworkLabelContainer>
                <NetworkLabel>
                  {networks[0]}
                </NetworkLabel>
              </NetworkLabelContainer>
            )}
            {commentCount >= 0 && (
              <CommentCount>
                {`${commentCount}`}
              </CommentCount>
            )}
          </BottomContainer>
        </DescriptionAuthorContainer>
      </HeadlineContainer>
    </ArticleCardContainer>
  )
}

export default Article