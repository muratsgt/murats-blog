import Image from 'next/image'
import styles from '../../styles/postpage.module.scss'
import prisma from '../../lib/prisma'
import Layout from "../../components/Layout"
import { useSession } from 'next-auth/react';
import { Button } from 'react-bootstrap';
import { fetchData } from '../../helper/fetchData';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown'

// article page
export default function Article({ post }) {
    const { data: session } = useSession();
    const router = useRouter();
    let postOwner = false
    postOwner = session?.userId == post?.authorId;

    // default image if there is no image
    let imageUrl = post?.imageUrl ?? "/defaultpic.jpg"

    const handleDelete = () => {
        fetchData(`/api/post/delete?postId=${post.id}`)
            .then(res => {
                if (res.error)
                    alert(res.error)
                else {
                    router.push("/myarticles");
                }
            });
    }

    return (
        <Layout pageTitle={post.title} pageDesc={post.content?.slice(0, 50)}>
            <div className={styles.mainarea}>
                <div className={styles.headarea}>
                    <h1>{post.title}</h1>
                    {post.author && <h4>by {post.author.name}</h4>}
                </div>
                {postOwner && <div className={styles.editactions}>
                    {/* <Button size="sm" variant="outline-primary">
                        Edit Post</Button> */}
                    <Button onClick={handleDelete} size="sm" variant="outline-danger">
                        Delete Post</Button>
                </div>}
                <Image
                    src={imageUrl}
                    alt={post.title}
                    width={1000}
                    height={300}
                    objectFit="cover"
                    objectPosition="center"
                ></Image>
                <ReactMarkdown className={styles.contentarea}>
                    {post.content}
                </ReactMarkdown>
            </div>
        </Layout>
    )
}


export async function getServerSideProps({ params, res }) {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(params?.id) || -1,
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });

    if (!post) {
        return {
            notFound: true,
        }
    }
    return {
        props: { post }
    };
};