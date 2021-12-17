import Image from 'next/image'
import styles from '../../styles/postpage.module.scss'
import Layout from "../../components/Layout"
import { useSession } from 'next-auth/react';
import { Button } from 'react-bootstrap';
import { fetchData } from '../../helper/fetchData';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown'
import ShareButtons from '../../components/ShareButtons';
import { useState, useEffect } from "react"
import Loading from '../../components/Loading'
import InfoModal from "../../components/InfoModal"

// article page
export default function Article() {
    const { data: session } = useSession();
    const [post, setPost] = useState(null);
    const [isModal, setModal] = useState(false);

    const router = useRouter();

    let loading = !post?.id && !post?.error

    // check if the post is from the user
    let postOwner = false
    if (session?.userId)
        postOwner = session?.userId == post?.authorId;

    // default image if there is no image
    let imageUrl = post?.imageUrl ?? "/defaultpic.jpg"

    // on page load
    useEffect(() => {
        if (router?.query.id)
            fetchData(`/api/post/${router?.query.id}`)
                .then(res => {
                    console.log(`response from fetch: `, res)
                    if (res.error)
                        setPost({ error: res.error })
                    else
                        setPost(res)
                })
    }, [router?.query.id])

    // open delete modal
    const handleDelete = () => {
        setModal(true);
    }

    return (
        <Layout pageTitle={post?.title} pageDesc={post?.content?.slice(0, 50)}>
            {loading ? <Loading />
                : post.error ?
                    <div className={styles.mainarea}>
                        <div className={styles.headarea}>
                            <h1>{post.error}</h1>
                        </div>
                    </div>
                    :
                    <div className={styles.mainarea}>
                        <div className={styles.headarea}>
                            <h1>{post?.title}</h1>
                            {post?.author && <h4>by {post?.author.name}</h4>}
                        </div>
                        {postOwner &&
                            <div className={styles.editactions}>
                                {isModal && <InfoModal postId={post.id}
                                    set={setModal} title="Are you sure?"
                                    message="Post will be deleted from database" />
                                }
                                <Button onClick={handleDelete} size="sm" variant="outline-danger">
                                    Delete Post</Button>
                            </div>
                        }
                        <ShareButtons />
                        <Image
                            src={imageUrl}
                            alt={post?.title}
                            width={1000}
                            height={300}
                            objectFit="cover"
                            objectPosition="center"
                        ></Image>
                        <ReactMarkdown className={styles.contentarea}>
                            {post?.content}
                        </ReactMarkdown>
                    </div>
            }
        </Layout>
    )
}


