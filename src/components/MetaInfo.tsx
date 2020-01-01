import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  time: number;
  numComments?: number;
  by: string;
}

const MetaInfo: React.FC<Props> = ({ id, time, numComments, by }) => {
  return (
    <div className='meta-info'>
      <span>by {<Link to={`/user?id=${by}`}>{by}</Link>} </span>
      <span>on {new Date(time * 1000).toLocaleString()} </span>
      {numComments !== undefined && (
        <span>
          with <Link to={`/post?id=${id}`}>{numComments}</Link> comments
        </span>
      )}
    </div>
  );
};

export default MetaInfo;
