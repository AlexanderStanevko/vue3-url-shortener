import axios, { AxiosRequestConfig } from 'axios'
import { errorHandler } from 'utils/errroHandling'
import { JWT_STORAGE_KEY } from 'utils/global'
import { errorAlert } from 'utils/notifications'
import { Nullable } from 'utils/nullable'
import { SessionStorage } from 'utils/storage'
import { ErrorResponse } from 'types'

type HandleAPIRequestArgs<T> = {
  controller?: Nullable<string>;
  method: string;
  httpMethod?: 'get' | 'post' | 'delete';
  body?: Nullable<T>;
  params?: Record<string, unknown>;
  baseURL?: string;
  headers?: Record<string, string>;
}

type ExtendedResponse<T> = T & ErrorResponse;

// eslint-disable-next-line complexity
export const handleAPIRequest = async <
  ResponseType,
  RequestBodyType = undefined
>({
  controller = 'pipe/v1/general',
  method,
  httpMethod = 'post',
  body = null,
  params = {},
  baseURL = process.env.API_URL,
  headers = {},
}: HandleAPIRequestArgs<RequestBodyType>): Promise<Nullable<ExtendedResponse<ResponseType>>> => {

  try {
    const url = controller
      ? `${controller}/${method}`
      : method

    const axiosConfig: AxiosRequestConfig = {
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params,
    }

    const jwt = SessionStorage.get(JWT_STORAGE_KEY)

    if (jwt && axiosConfig.headers) {
      axiosConfig.headers.Authorization = `Bearer ${jwt}`
    }


    let response = null

    if (httpMethod === 'get') {
      response = (await axios.get<ExtendedResponse<ResponseType>>(url, axiosConfig)).data
    } else {
      response = (await axios[httpMethod]<ExtendedResponse<ResponseType>>(url, {
        ...body,
      }, axiosConfig)).data
    }

    if (response.error) {
      const message = Array.isArray(response.error)
        ? response.error[0].message
        : response.message || response?.error

      throw new Error(message)
    }

    return response
  } catch (error: Error) {
    const message = errorHandler(error)

    errorAlert({ message })

    return null
  }
}