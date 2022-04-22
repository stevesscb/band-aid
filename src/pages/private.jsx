import useSWR from 'swr'

import withAuth from '@/hoc/withAuth'
import { fetcher } from '@/hooks/_utils'

export function Private() {
  const { data } = useSWR('/api/private', fetcher)
  // eslint-disable-next-line no-console
  console.log(data)
  return <div>This is a protected page!</div>
}

export default withAuth(Private)
