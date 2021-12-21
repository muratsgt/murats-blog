import { useState} from 'react'
import styles from '../styles/editor.module.scss'
import PostEditor from '../components/PostEditor'
import InfoModal from "../components/InfoModal"
import Layout from "../components/Layout"
import { useSession } from 'next-auth/react';

// editor page
export default function MyEditor({ post }) {
    const [isModal, setModal] = useState(false);
    const { data: session } = useSession()

    return (
        <Layout
            pageTitle="Murat's Blog - Post Editor"
            pageDesc='Share Your Story'
        >
            {isModal && <InfoModal title="saving ..."
                message="We will publish your post after review.
                        Thank you for your contribution 😊"/>
            }
            <div className={styles.mainarea}>
                <h2>Share Your Story...</h2>
                <p>Gaining knowledge, is the first step to wisdom. <br />
                    Sharing it, is the first step to humanity.</p>
                {session ? <PostEditor setPosting={setModal}></PostEditor>
                : <h2> <br /><br /> Please login to submit a new post.</h2> }
            </div>
        </Layout>
    )
}