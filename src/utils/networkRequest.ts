import axios, { Method } from "axios"

const API_BASE_URL = "https://ign-apis.herokuapp.com"

export enum APIEndpoints {
  ARTICLES = "/articles",
  COMMENT_COUNT = "/comments",
  VIDEOS = "/videos"
}

export const makeAPIRequest = async (endPoint: APIEndpoints, method: Method, queryParamString: string = ""): Promise<any> => {
  const responseData = await axios.get(`${API_BASE_URL}${endPoint}${queryParamString}`, { method })
  return responseData.data
}