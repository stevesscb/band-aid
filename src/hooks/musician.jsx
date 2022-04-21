import produce from 'immer'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import { handleErrors, fetcher } from '@/hooks/_utils'

export default function useTodo() {
  const { query: { id }, push } = useRouter()
  const { data, error, mutate } = useSWR(id ? `/api/todos/${id}` : null, fetcher)

  const updateTodo = async (values) => {
    await axios({
      method: 'PUT',
      url: `/api/todos/${id}`,
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const destroyTodo = async () => {
    push('/swr')

    await axios({
      method: 'DELETE',
      url: `/api/todos/${id}`
    }).then(() => {
      mutate('/api/todos')
    }).catch((err) => {
      push(`/swr/${id}`)
      handleErrors(err)
    })
  }

  const createTodoItem = async (values) => {
    await axios({
      method: 'POST',
      url: `/api/todos/${id}/items`,
      data: values
    }).then((resp) => {
      mutate(data, produce(data, (draft) => {
        draft.items.push(resp.data)
      }))
    }).catch(handleErrors)
  }

  const updateTodoItem = async (values, item) => {
    const optimisticData = produce(data, (draft) => {
      const index = draft.items.findIndex((draftItem) => draftItem.id === item.id)
      if (index !== -1) draft.items[index] = { ...draft.items[index], ...values }
    })

    const request = axios({
      method: 'PUT',
      url: `/api/todos/${id}/items/${item.id}`,
      data: values
    }).then(() => optimisticData).catch(handleErrors)

    await mutate(request, {
      optimisticData,
      rollbackOnError: true
    })
  }

  const destroyTodoItem = async (item) => {
    const optimisticData = produce(data, (draft) => {
      const index = draft.items.findIndex((draftItem) => draftItem.id === item.id)
      if (index !== -1) draft.items.splice(index, 1)
    })

    const request = axios({
      method: 'DELETE',
      url: `/api/todos/${id}/items/${item.id}`
    }).then(() => optimisticData).catch(handleErrors)

    await mutate(request, {
      optimisticData,
      rollbackOnError: true
    })
  }

  return {
    todo: data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    updateTodo,
    destroyTodo,
    createTodoItem,
    updateTodoItem,
    destroyTodoItem
  }
}
