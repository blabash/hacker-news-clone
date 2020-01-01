import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../utilities/api';
import MetaInfo from './MetaInfo';

interface Props {
  item: Item;
}

const PostListing: React.FC<Props> = ({ item }) => {
  return (
    <li className='post-listing'>
      {item.url ? (
        <a href={item.url as string}>{item.title}</a>
      ) : (
        <Link to={`/post?id=${item.id}`}></Link>
      )}

      <MetaInfo
        id={item.id}
        time={item.time}
        by={item.by as string}
        numComments={item.kids ? item.kids.length : 0}
      />
    </li>
  );
};

export default PostListing;
