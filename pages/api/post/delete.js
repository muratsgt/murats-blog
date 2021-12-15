// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma'
import { getSession } from "next-auth/react"

/**
 * @path /api/post/delete?postId=<someId>
 * deletes post from db
 */
export default async function deletePost(req, res) {
    // get post id from req
    const { postId } = req.query;
    // get session info
    const session = await getSession({ req });
    // get post info from db
    const postInfo = await prisma.post.findUnique({
        where: {
            id: Number(postId) || -1,
        },
    })
    // compare post author and session owner
    if (postInfo.authorId == session.userId) {
        const post = await prisma.post.delete({
            where: {
                id: Number(postId),
            }
        });
        if (post)
            // return success
            return res.status(200).json(post);
    }
    res.status(400).json({ error: "Error: cannot delete the post !" })
}