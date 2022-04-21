import nc from '@/controllers/_helpers/nc'
import controllersTodosIndex from '@/controllers/todos/index'
import controllersTodosCreate from '@/controllers/todos/create'

export default nc()
  .get(controllersTodosIndex)
  .post(controllersTodosCreate)
