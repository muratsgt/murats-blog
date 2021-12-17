import styles from '../styles/Home.module.scss'
import prisma from '../lib/prisma'
import { CardTop, CardFlat } from '../components/PostCard'
import Layout from '../components/Layout'

// Home page
export default function Home({ feed }) {

  return (
    <Layout >
      <div className={styles.topbox}>
        <CardTop className={styles.top1} post={feed[0]} />
        <CardTop type2 className={styles.top2} post={feed[1]} />
        <CardTop type2 className={styles.top3} post={feed[2]} />
      </div>
      <div className={styles.belowbox}>
        {feed.slice(3).map((i) => <CardFlat key={i.id} post={i} />)}
      </div>
    </Layout>
  )
}

// builds homepage every 2 hours period
export const getStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed }, revalidate: 7200, };
};