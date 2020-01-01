import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { fetchUser, IUser } from '../utilities/api';
import Posts from './Posts';

interface Props {}

const User: React.FC<Props> = () => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [userSubmittedCount, setUserSubmittedCount] = React.useState(0);
  const [submittedSlice, setSubmittedSlice] = React.useState(50);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { id: userID } = queryString.parse(useLocation().search);

  React.useEffect(() => {
    async function getUser() {
      const user = await fetchUser(userID as string);
      if (!user) {
        setError('There was an error finding this user.');
        setLoading(false);
      } else {
        setUser(user);
        setUserSubmittedCount(user.submitted.length);
        setError(null);
        setLoading(false);
      }
    }

    getUser();
  }, [userID]);

  if (loading) return <div>Loading user...</div>;

  if (error) return <p>{error}</p>;

  return (
    user && (
      <React.Fragment>
        <h1>{user.id}</h1>
        <div className='user-meta-info'>
          <span>
            joined{' '}
            <strong>{new Date(user.created * 1000).toLocaleString()}</strong>{' '}
          </span>
          <span>
            has <strong>{user.karma}</strong> karma
          </span>
        </div>
        <h2>Posts</h2>
        <Posts postID={user.submitted.slice(0, submittedSlice)} />
        {submittedSlice <= userSubmittedCount && (
          <button onClick={() => setSubmittedSlice(s => s + 50)}>
            Load More
          </button>
        )}
      </React.Fragment>
    )
  );
};

export default User;
