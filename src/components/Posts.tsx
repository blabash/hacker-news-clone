import React from 'react';
import useFetchPosts from '../customHooks/useFetchPosts';
import PostListing from './PostListing';
import Loading from './Loading';

interface Props {
  postID: string | number | number[];
}

const Posts: React.FC<Props> = ({ postID }) => {
  const { error, loading, data: posts } = useFetchPosts(postID);

  if (loading) return <Loading text='Loading posts' />;

  if (error) return <p>{error}</p>;

  return (
    <ul>
      {posts &&
        posts.map(post => {
          return <PostListing key={post.id} item={post} />;
        })}
    </ul>
  );
};

export default Posts;
