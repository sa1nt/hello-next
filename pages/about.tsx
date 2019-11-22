import Layout from '../components/Layout';
import { NextPage } from 'next';

const About: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <Layout>
    <p>This is the about page</p>
    <p>User agent: {userAgent}</p>
  </Layout>
);

About.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
}

export default About;
