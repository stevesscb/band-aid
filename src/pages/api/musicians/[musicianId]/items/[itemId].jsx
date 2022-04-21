import nc from '@/controllers/_helpers/nc'
import controllersTodosItemsUpdate from '@/controllers/todos/items/update'
import controllersTodosItemsDestroy from '@/controllers/todos/items/destroy'

export default nc()
  .put(controllersTodosItemsUpdate)
  .delete(controllersTodosItemsDestroy)
