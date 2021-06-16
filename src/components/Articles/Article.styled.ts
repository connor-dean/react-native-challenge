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

export { ArticleCardContainer, HeadlineContainer, HeadlineText, ThumbnailContainer, Thumbnail }
