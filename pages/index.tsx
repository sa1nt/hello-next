import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Show from '../common/Show';
import { NextPage } from 'next';

const PostLink: NextPage<{ show: Show }> = ({ show }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${show.id}`}>
      <a>{show.name}</a>
    </Link>
    <style jsx>{`
    a {
      font-family: "Arial";
      text-decoration: none;
      color: blue;
    }

    a:hover {
      opacity: 0.6;
    }

    li {
      list-style: none;
      margin: 5px 0;
    }
    `}</style>
  </li>
);

const Index: NextPage<{ shows: Show[] }> = ({ shows }) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {shows.map(show => (
        <PostLink key={show.id} show={show} />
      ))}
    </ul>
    <style jsx>{`
        h1 {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }
    `}</style>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data: [{score: number, show: Show}] = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
