import useSWR from 'swr'
import axios from 'axios'
import produce from 'immer'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useTodos() {
  const { query: { page }, isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? ['/api/todos', { page: Number(page) || 1 }] : null, fetcher)

  const createTodo = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/todos',
      data: values
    }).then((resp) => {
      mutate(produce(data, (draft) => {
        draft.todos.push(resp.data)
      }))
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    todos: data?.todos || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createTodo
  }
}
