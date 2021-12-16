// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma'

/**
 * @path /api/post/[id]
 * @return post data as JSON object
 */
export default async function getPost(req, res) {
  try {
    const id = req.query.id
    const data = await prisma.post.findUnique({
      where: {
        id: Number(id) || -1,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    if (!data) {
      return res.status(500).json({ error: "Article not found!" })
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error })
  }
}