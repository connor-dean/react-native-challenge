import React from "react"
import {
  Container,
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
  CommentCount,
  TimeAgoText,
  CommentCountContainer
} from "./FeedCard.styled"
import dayjs from "dayjs"
import { ContentFeedDTO } from "./ContentFeed"
import { useNavigation } from "@react-navigation/native"

type FeedCardProps = {
  content: ContentFeedDTO
}

const FeedCard: React.FC<FeedCardProps> = ({
  content: {
    headline,
    smallThumbnail,
    description,
    authors,
    networks,
    commentCount,
    publishDate
  }
}) => {
  const navigation = useNavigation()

  const formatPublishTime = (): string | undefined => {
    const publishDateDayJs = dayjs(publishDate)

    const years = Math.floor(dayjs().diff(publishDateDayJs, "years"))
    if (years) return `${years} years ago`

    const months = Math.floor(dayjs().diff(publishDateDayJs, "months"))
    if (months) return `${months} months ago`

    const days = Math.floor(dayjs().diff(publishDateDayJs, "days"))
    if (days) return `${days} days ago`

    const minutes = Math.floor(dayjs().diff(publishDateDayJs, "minutes"))
    if (minutes) return `${minutes} minutes ago`
  }

  const publishTimeText = formatPublishTime()

  const openWebView = () => {
    navigation.navigate("Web", {
      url: "http://ign.com"
    })
  }

  return (
    <Container>
      {publishTimeText && (
        <TimeAgoText>
          {publishTimeText}
        </TimeAgoText>
      )}
      <ArticleCardContainer onPress={openWebView}>
        <HeadlineContainer>
          <HeadlineText>
            {headline}
          </HeadlineText>
          <ThumbnailContainer>
            {/* Would typically render image sizes based off device dimensions */}
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
            {authors && authors.length > 0 && (
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
                <CommentCountContainer onPress={(e) => e.preventDefault()} disabled>
                  <CommentCount suppressHighlighting>
                    {`${commentCount}`}
                  </CommentCount>
                </CommentCountContainer>
              )}
            </BottomContainer>
          </DescriptionAuthorContainer>
        </HeadlineContainer>
      </ArticleCardContainer>
    </Container>
  )
}

export default FeedCard