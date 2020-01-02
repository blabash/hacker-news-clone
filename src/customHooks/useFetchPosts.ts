import React from 'react';
import { fetchMainPosts, fetchPosts, fetchItem, Item } from '../utilities/api';

export default function useFetchPosts(
  ids: string | number | number[],
  showLoading: boolean
) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Item[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (showLoading) setLoading(true);
    let idsType = typeof ids;
    switch (idsType) {
      case 'string':
        fetchMainPosts(ids as string)
          .then(posts => {
            setData(posts);
            setError(null);
            setLoading(false);
          })
          .catch(e => {
            console.warn(e);
            setError('Error fetching data. Try again.');
            setLoading(false);
          });
        break;
      case 'number':
        fetchItem(ids as number)
          .then(post => {
            setData([post]);
            setError(null);
            setLoading(false);
          })
          .catch(e => {
            console.warn(e);
            setError('Error fetching data. Try again.');
            setLoading(false);
          });
        break;
      case 'object':
        fetchPosts(ids as number[])
          .then(posts => {
            setData(posts);
            setError(null);
            setLoading(false);
          })
          .catch(e => {
            console.warn(e);
            setError('Error fetching data. Try again.');
            setLoading(false);
          });
        break;
      default:
        throw new Error('Could not fetch posts for that id.');
    }
  }, [ids, showLoading]);

  return {
    loading,
    data,
    error
  };
}
