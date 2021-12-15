import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';

const MyPosts = (props) => {
    const { data: session, status } = useSession()

    if (!session) {
        return (
            <Layout>
                <h2>My Articles</h2>
                <h4>You need to be authenticated to view this page.</h4>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1>My Articles</h1>
            <main>
                {props.myPosts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                    </div>
                ))}
            </main>
        </Layout>
    );
};

export default MyPosts;





export const getServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { drafts: [] } };
    }

    const myPosts = await prisma.post.findMany({
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
        props: { myPosts },
    };
};