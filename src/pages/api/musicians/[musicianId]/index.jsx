import nc from '@/controllers/_helpers/nc'
import controllersTodosShow from '@/controllers/todos/show'
import controllersTodosUpdate from '@/controllers/todos/update'
import controllersTodosDestroy from '@/controllers/todos/destroy'

export default nc()
  .get(controllersTodosShow)
  .put(controllersTodosUpdate)
  .delete(controllersTodosDestroy)
