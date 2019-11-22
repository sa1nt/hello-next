import { NextPage, NextPageContext } from 'next';
import Layout from '../../components/Layout';
import Markdown from 'react-markdown';
import fetch from 'isomorphic-unfetch';
import Show from '../../common/Show';

const Post: NextPage<{ show: Show }> = ({ show }) => (
  <Layout>
    <h1>{show.name}</h1>
    <p>{show.summary.replace(/<[/]?[pb]>/g, '')}</p>
    <img src={show.image.medium} />

    <div className="markdown">
      <Markdown source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
      `} />
    </div>

    <style jsx global>{`
      .markdown {
        font-family: 'Arial';
      }

      .markdown a {
        text-decoration: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
  </Layout>
);

Post.getInitialProps = async ( ctx: NextPageContext ) => {
  const { id } = ctx.query;
  const url: string = `https://api.tvmaze.com/shows/${id}`;
  console.log(url);

  const result = await fetch(url);
  const show: Show = await result.json();

  console.log(`Fetched show: ${JSON.stringify(show)}`);
  return { show };
}

export default Post;
