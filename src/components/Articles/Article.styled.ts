import { Image, Text, View } from "react-native"
import styled from "styled-components/native"

type ThumbnailProps = {
  height: number
  width: number
}

const ArticleCardContainer = styled(View)`
  display: flex;
  flex-direction: column;
  border: 2px solid lightgray;
  border-radius: 5px;
  padding: 15px;
  margin: 5px;
`

// TODO do we need this?
const HeadlineContainer = styled(View)`
  display: flex;
`

const HeadlineText = styled(Text)`
  font-size: 24px;
  font-weight: 800;
`

const ThumbnailContainer = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Thumbnail = styled(Image)<ThumbnailProps>`
  border-radius: 5px;
  width: 100%;
  aspect-ratio: ${({ height, width }) => width / height};
  margin: 10px 0;
`

const DescriptionAuthorContainer = styled(View)`
  margin: 0 10px;
`

const Description = styled(Text)`
  font-weight: 500;
  line-height: 20px;
`

const AuthorContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
`

const AuthorThumbnail = styled(Image)`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin-right: 10px;
`

const AuthorName = styled(Text)`
  font-weight: 600;
`

const BottomContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0;
`

const NetworkLabelContainer = styled(View)`
  display: flex;
  width: auto;
  border-bottom-width: 3px;
  border-bottom-color: red;
  padding-bottom: 2px;
`

const NetworkLabel = styled(Text)`
  color: red;
  font-weight: 800;
  text-decoration-color: red;
  text-transform: capitalize;
  letter-spacing: 1px;
  font-size: 12px;
`

const CommentCount = styled(Text)`
  font-weight: 700;
`

export {
  ArticleCardContainer,
  HeadlineContainer,
  HeadlineText,
  ThumbnailContainer,
  Thumbnail,
  DescriptionAuthorContainer,
  Description,
  AuthorContainer,
  AuthorThumbnail,
  AuthorName,
  BottomContainer,
  NetworkLabelContainer,
  NetworkLabel,
  CommentCount
}
