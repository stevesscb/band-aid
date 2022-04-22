import { getSession } from 'next-auth/react'

const authenticateUser = async (req, res, next) => {
  const session = await getSession({ req })
  console.log(session)

  if (!session) return res.status(401).json({ message: 'Please Log In First!' })
  return next()
}

export default authenticateUser
