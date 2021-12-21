import styles from '../styles/Home.module.scss'
import { CardFlat } from '../components/PostCard'
import Layout from '../components/Layout'
import { useRouter } from 'next/router';
import { fetchData } from '../helper/fetchData';
import { useState, useEffect } from 'react'
import Loading from "../components/Loading/Loading"

// search results page
export default function SearchPage() {
  const [posts, setPosts] = useState(null);
  const router = useRouter();

  let loading = posts === null;
  let noResult = !loading && !posts.length;

  useEffect(() => {
    fetchData(`/api${router.asPath}`)
      .then(dt => {
        setPosts(dt)
      })
  }, [router])

  return (
    <Layout >
      <div className={styles.belowbox} style={{ padding: "20px 0" }}>
        <h2>Search Results</h2> <br />
        {loading && <Loading />}
        {noResult && <h3>Unfortunately, no results were found</h3> }
        {posts?.map((i) => <CardFlat key={i.id} post={i} />)}
      </div>
    </Layout>
  )
}