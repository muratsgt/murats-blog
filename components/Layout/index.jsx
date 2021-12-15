import Head from 'next/head'
import Navigation from '../Navigation'
import styles from './layout.module.scss'

// article page
export default function Layout({ children,
    pageTitle = "Murat's Blog",
    pageDesc = "Publish your articles, blog entries, ideas, feelings and more... ",
    ...props }) {

    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
                <meta charSet="UTF-8" />
                <meta name="description" content={pageDesc} />
                <meta name="author" content="Murat Akca" />
                <meta name="keywords" content="Blog, Murat, Akca, Life, Technology" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation></Navigation>
            <div className={styles.main} {...props}>
                {children}
            </div>
        </div>
    )
}