import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getUserWithId } from '../my/profile/_queries'

const controllersMusiciansShow = async (req, res) => {
  try {
    const session = await getSession({ req })
    const foundUser = await getUserWithId(session.user.id)
    return res.status(200).json(foundUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMusiciansShow)
