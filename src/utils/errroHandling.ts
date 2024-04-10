import { AxiosError } from 'axios'
import {
  STATUS_CODES,
} from 'utils/global'

export const errorHandler = (errorObject: AxiosError) => {

  if (errorObject?.response?.status === STATUS_CODES.HTTP_401 &&
    errorObject?.config?.url?.includes('UserLogin')) {

    return 'wrongUser'
  }

  return errorObject?.message || 'connectionError'
}
