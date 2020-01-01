import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../utilities/api';
import PostMetaInfo from './PostMetaInfo';

interface Props {
  item: Item;
}

const PostListing: React.FC<Props> = ({ item }) => {
  return (
    <li className='post-listing'>
      {item.url ? (
        <Link to={item.url as string}>{item.title}</Link>
      ) : (
        <Link to={`/post?id=${item.id}`}></Link>
      )}

      <PostMetaInfo
        id={item.id}
        time={item.time}
        by={item.by as string}
        numComments={item.kids ? item.kids.length : 0}
      />
    </li>
  );
};

export default PostListing;
