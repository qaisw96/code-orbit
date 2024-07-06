import React from 'react';
import { IForksListProps, IForkItem } from './Fork.types';
import ForkItem from './ForkItem';

const ForksList: React.FC<IForksListProps> = ({ forks }) => {
  return (
    <>
      {forks && forks.length > 0 ? (
        <ul className='forks flex gap-2 mt-2'>
          {forks.map((fork: IForkItem) => (
            <ForkItem key={fork.id} {...fork} />
          ))}
        </ul>
      ) : (
        <p className='text-xs mt-2'>No recent forks found.</p>
      )}
    </>
  );
};

export default ForksList;
