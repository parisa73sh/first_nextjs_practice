import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

type Post = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  post: Post;
};

const PostPage: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
  const post = await res.json();

  return {
    props: { post },
  };
};

export default PostPage;
