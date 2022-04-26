import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'

const controllersMusiciansIndex = async (req, res) => {
  try {
    // Filters
    const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    // Pagination
    const take = 10
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      displayName: {
        contains: q
      }
    }

    const totalMusicians = await prisma.user.count({ where })
    const foundMusicians = await prisma.user.findMany({
      take,
      skip,
      where,
      orderBy: {
        [orderBy]: sortBy
      },
      include: {
        portraits: true,
        instruments: true
      }
    })

    return res.status(200).json({
      musicians: foundMusicians,
      meta: { currentPage: page, totalPages: Math.ceil(totalMusicians / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersMusiciansIndex)
