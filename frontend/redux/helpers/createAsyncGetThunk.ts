import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { httpClient } from '@/clients/httpClient'

interface MetaArgs<T> {
  params?: { [param: string]: string }
  onReject?: () => void
}

export default function createAsyncGetThunk<T>(
  url: string,
): AsyncThunk<T | undefined, MetaArgs<T> | undefined, {}> {
  return createAsyncThunk(`${url}/get`, async (meta) => {
    try {
      let formattedParams = ''

      if (meta?.params) {
        Object.keys(meta.params).forEach((param, idx) => {
          formattedParams = `${formattedParams}${idx ? '&' : ''}${param}=${
            meta.params![param]
          }`
        })
      }

      return (
        await httpClient.get(
          formattedParams ? `${url}?${formattedParams}` : url,
        )
      ).data
    } catch (error) {
      if (error instanceof AxiosError) return Promise.reject(error.message)
    }
  })
}
