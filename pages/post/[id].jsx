import Head from 'next/head'
import Navigation from '../../components/Navigation'
import Image from 'next/image'
import styles from '../../styles/postpage.module.scss'
import prisma from '../../lib/prisma'

// article page
export default function Article({ post }) {

    return (
        <div className={styles.container}>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.content?.slice(0, 50)} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation></Navigation>
            <div className={styles.main}>
                <div className={styles.headarea}>
                    <h2>{post.title}</h2>
                    <h4>by {post.author?.name}</h4>
                </div>
                <Image
                    src={post.imageUrl}
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
        </div>
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