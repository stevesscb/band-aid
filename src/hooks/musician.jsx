import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMusician() {
  const { query: { id } } = useRouter()
  const { data, error } = useSWR(id ? `/api/musicians/${id}` : null, fetcher)

  return {
    musician: data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
