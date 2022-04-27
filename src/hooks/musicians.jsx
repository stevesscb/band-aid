import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMusicians() {
  const { query: { page }, isReady } = useRouter()
  const { data, error } = useSWR(isReady ? ['/api/musicians', { page: Number(page) || 1 }] : null, fetcher)

  return {
    meta: data?.meta,
    musicians: data?.musicians || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
