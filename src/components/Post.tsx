import React from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Item, fetchItem, fetchComments } from '../utilities/api';
import { Link } from 'react-router-dom';
import MetaInfo from './MetaInfo';

interface Props {}

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

      if (!post) {
        setPostError('There was an issue fetching this post.');
        setPostLoading(false);
      } else {
        setPost(post);
        setPostError(null);
        setPostLoading(false);
        const comments = await fetchComments(post.kids || []);
        if (!comments) {
          setCommentsError(
            'There was an issue fetching the comments for this post.'
          );
          setCommentsLoading(false);
        } else {
          setComments(comments);
          setCommentsError(null);
          setCommentsLoading(false);
        }
      }
    }

    fetchPost();
  }, [id]);

  if (postLoading) return <div>Loading...</div>;

  if (postError) return <p>{postError}</p>;

  return (
    post && (
      <div>
        <h1>
          {post.url ? (
            <a href={post.url}>{post.title}</a>
          ) : (
            <Link to={`/post?id=${post.id}`}></Link>
          )}
        </h1>
        <MetaInfo
          id={post.id}
          time={post.time}
          by={post.by as string}
          numComments={post.kids ? post.kids.length : 0}
        />
        {commentsLoading ? (
          <div>Loading comments...</div>
        ) : commentsError ? (
          <p>{commentsError}</p>
        ) : comments ? (
          <ul>
            {comments.map(comment => {
              return (
                <li key={comment.id}>
                  <MetaInfo
                    id={comment.id}
                    time={comment.time}
                    by={comment.by as string}
                  />
                  {comment.text && (
                    <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
                  )}
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
