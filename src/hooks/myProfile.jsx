import axios from 'axios'
import useSWR from 'swr'
import { serialize } from 'object-to-formdata'

import { handleErrors, fetcher } from '@/hooks/_utils'

export default function useMyProfile() {
  const { data, error, mutate } = useSWR('/api/my/profile', fetcher)

  const updateMyProfile = async (values, cb) => {
    await axios({
      method: 'PUT',
      url: '/api/my/profile',
      data: serialize(values, { indices: true })
    }).then((resp) => {
      if (cb) cb()
      mutate(resp.data)
    }).catch(handleErrors)
  }

  return {
    myProfile: data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    updateMyProfile
  }
}
