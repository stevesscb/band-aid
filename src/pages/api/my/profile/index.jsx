import nc from '@/controllers/_helpers/nc'
import controllersMyProfileShow from '@/controllers/my/profile/show'
import controllersMyProfileUpdate from '@/controllers/my/profile/update'

export default nc()
  .get(controllersMyProfileShow)
  .put(controllersMyProfileUpdate)

export const config = {
  api: {
    bodyParser: false
  }
}
