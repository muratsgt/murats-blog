import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import styles from '../styles/myarticles.module.scss';
import { CardFlat } from '../components/PostCard';

// page for drafts and published articles from user
const MyArticles = (props) => {
    const { data: session } = useSession()

    if (!session) {
        return (
            <Layout pageTitle='User Posts'>
                <div className={styles.mainarea}>
                    <h2>You need to be authenticated to view this page.</h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout pageTitle='User Posts'>
            <div className={styles.mainarea}>
                <h2>My Articles</h2>
                {props.articles.map((post) => (
                    <CardFlat className={styles.cardstyle} key={post.id} post={post}>
                        <div className={styles.status}>
                            Status: <br />
                            {post.published ? <p color='green'>Published</p>
                                : <p color='yellow'>In review</p>}
                        </div>
                    </CardFlat>
                ))}
            </div>

        </Layout>
    );
};

export default MyArticles;





export const getServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { drafts: [] } };
    }

    const articles = await prisma.post.findMany({
        where: {
            author: { email: session.user.email },
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    return {
        props: { articles },
    };
};