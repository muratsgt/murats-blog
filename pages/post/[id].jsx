import Image from 'next/image'
import styles from '../../styles/postpage.module.scss'
import prisma from '../../lib/prisma'
import Layout from "../../components/Layout"

// article page
export default function Article({ post }) {
    let imageUrl = post.imageUrl ?? "/defaultpic.jpg"

    return (
        <Layout pageTitle={post.title} pageDesc={post.content?.slice(0, 50)}>
            <div className={styles.mainarea}>
                <div className={styles.headarea}>
                    <h2>{post.title}</h2>
                    {post.author && <h4>by {post.author.name}</h4>}
                </div>
                <Image
                    src={imageUrl}
                    alt={post.title}
                    width={1000}
                    height={300}
                    objectFit="cover"
                    objectPosition="center"
                ></Image>
                <div className={styles.contentarea}>
                    <p>{post.content}</p>
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps({ params }) {
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
    console.log(`post`, post)
    return {
        props: { post }
    };
};