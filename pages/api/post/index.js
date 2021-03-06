// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/react"

/**
 * @path /api/post
 * Required fields in body: title, content
 * Optional fields in body: imageUrl
 */

// request router for various methods
export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPost(req, res);
    case "POST":
      return postPost(req, res);
    case "PUT":
      return editPost(req, res);
    default:
      return res.status(400).json({ message: 'Wrong request!' });
  }
}

// returns all the posts
export async function getPost(req, res) {
  try {
    let options = {
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    }
    if (req.query.text) {
      let searchText = decodeURI(req.query.text);
      options.where = {
        published: true,
        title: {
          contains: searchText,
          mode: 'insensitive',
        }
      }
    }

    const data = await prisma.post.findMany(options);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export async function editPost(req, res) {
  return null
}

// saves new post to db
export async function postPost(req, res) {
  // title and content required
  const { title, imageUrl, content } = req.body;

  const session = await getSession({ req })
  // prisma handles to save DB
  const result = await prisma.post.create({
    data: {
      title: title,
      imageUrl: imageUrl,
      content: content,
      author: { connect: { email: session?.user?.email } }
    }
  });
  return res.json(result);
}