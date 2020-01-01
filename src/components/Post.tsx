import React from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Item, fetchItem, fetchComments } from '../utilities/api';

interface Props {}

// interface Comment {
//   by: string;
//   id: number;
//   kids: number[];
//   parent: number;
//   text: string;
//   time: number;
//   type: 'comment';
// }

const Post: React.FC<Props> = () => {
  const [post, setPost] = React.useState<Item | null>(null);
  const [comments, setComments] = React.useState<Item[] | null>(null);
  const [postError, setPostError] = React.useState<string | null>(null);
  const [postLoading, setPostLoading] = React.useState(true);
  const [commentsLoading, setCommentsLoading] = React.useState(true);
  const [commentsError, setCommentsError] = React.useState<string | null>(null);

  const { id } = queryString.parse(useLocation().search);

  React.useEffect(() => {
    async function fetchPost() {
      const post = await fetchItem(Number(id));
      console.log(post);
      if (!post) {
        console.log('derp');
        setPostError('There was an issue fetching this post.');
        setPostLoading(false);
      } else {
        setPost(post);
        setPostLoading(false);
        const comments = await fetchComments(post.kids || []);
        if (!comments) {
          setCommentsError(
            'There was an issue fetching the comments for this post.'
          );
          setCommentsLoading(false);
        } else {
          setComments(comments);
          setCommentsLoading(false);
        }
      }
    }

    fetchPost();
  }, []);

  if (postLoading) return <div>Loading...</div>;

  if (postError) return <p>{postError}</p>;

  return (
    post && (
      <div>
        <h1>{post.title}</h1>
        {commentsLoading ? (
          <div>Loading comments...</div>
        ) : commentsError ? (
          <p>{commentsError}</p>
        ) : comments ? (
          <ul>
            {comments.map(comment => {
              return (
                <li key={comment.id}>
                  <p>{comment.text}</p>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    )
  );
};

export default Post;
