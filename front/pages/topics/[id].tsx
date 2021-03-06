import Head from "next/head";
import { useRouter } from "next/router";
import Article from "../../components/article";
import Nav from "../../components/nav";
import MainLayout from "../../layouts";
import styles from "../../styles/Home.module.css";

function Topic(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <MainLayout>
      <Head>
        <title>Simple News - {props.title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank}/>
        <div className={styles.main} style={{marginRight:"10%"}}>
          <Article title={props.title} articles={props.topicArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${params.id}&country=kr&apiKey=9debea61385e45c1bbc39d14d842c60d`
  );
  const topicJson = await topicRes.json();
  const topicArticles = await topicJson.articles;

  const title = params.id;

  return {
    props: {topicArticles, title},
    revalidate: 60 * 10,
  };
}

export default Topic;