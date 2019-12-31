import React from 'react';
import useFetchPosts from '../customHooks/useFetchPosts';

interface Props {
  postID: string | number | number[];
}

const Posts: React.FC<Props> = ({ postID }) => {
  const { error, loading, data: posts } = useFetchPosts(postID);

  if (loading) return <div>Loading...</div>;

  if (error) return <p>{error}</p>;

  return <div>{JSON.stringify(posts, null, 2)}</div>;
};

export default Posts;
