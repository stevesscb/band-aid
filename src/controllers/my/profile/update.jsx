import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import parseData from '@/controllers/_middlewares/parseData'
import { schema } from '@/controllers/my/profile/_schemas'
import uploadFileAsync from '@/controllers/_helpers/uploadFile'

const controllersMyProfileUpdate = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { body } = req
    const verifiedData = await schema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...verifiedData,
        instruments: {
          deleteMany: {},
          create: verifiedData?.instruments?.map((i) => ({ type: i.type }))
        },
        tracks: {
          deleteMany: {},
          create: verifiedData?.tracks
        },
        portraits: {
          deleteMany: {},
          create: verifiedData?.portraits
        }
      },
      include: {
        instruments: true,
        portraits: true,
        tracks: true
      }
    })
    return res.status(200).json(updatedUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(parseData)
  .use(controllersMyProfileUpdate)
