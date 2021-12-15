import React from 'react'
import styles from '../styles/editor.module.scss'
import PostEditor from '../components/PostEditor'
import InfoModal from "../components/InfoModal"
import Layout from "../components/Layout"

// TODO: make it rich text editor

// article page
export default function MyEditor({ post }) {
    const [isModal, setModal] = React.useState(false);

    return (
        <Layout
            pageTitle="Murat's Blog - Post Editor"
            pageDesc='Share Your Story'
        >
            {isModal && <InfoModal />}
            <div className={styles.mainarea}>
                <h2>Share Your Story...</h2>
                <p>Gaining knowledge, is the first step to wisdom. <br />
                    Sharing it, is the first step to humanity.</p>
                <PostEditor setPosting={setModal}></PostEditor>
            </div>
        </Layout>
    )
}