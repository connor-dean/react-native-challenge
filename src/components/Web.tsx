import { RouteProp } from "@react-navigation/native"
import React from "react"
import { WebView } from "react-native-webview"
import { MyStackParamsList } from "./MyStack"

type WebProps = {
  route: RouteProp<MyStackParamsList, "Web">
}

const Web: React.FC<WebProps> = ({ route }) => {
  return <WebView source={{ uri: route.params.url }} />
}

export default Web
