import { ERROR_MESSAGES } from '~/constants/messages'

type FetchErrorLike = {
  status?: number
  data?: {
    message?: string
    errors?: Record<string, string[]>
  }
}

export const getApiErrorMessage = (error: unknown): string => {
  const fetchError = error as FetchErrorLike
  if (fetchError.status && fetchError.status >= 500) return ERROR_MESSAGES.serverError
  if (fetchError.data?.errors) return Object.values(fetchError.data.errors).flat().join('\n')
  if (fetchError.data?.message) return fetchError.data.message
  return ERROR_MESSAGES.generic
}
