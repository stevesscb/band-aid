import nc from '@/controllers/_helpers/nc'
import controllersTodosItemsCreate from '@/controllers/todos/items/create'

export default nc()
  .post(controllersTodosItemsCreate)
