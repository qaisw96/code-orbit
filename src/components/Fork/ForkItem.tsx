import React from 'react';
import Image from 'next/image';
import { IForkItem } from './Fork.types';

const ForkItem: React.FC<IForkItem> = ({ html_url, owner }) => {
  return (
    <li>
      <a href={html_url} target='_blank' className='flex items-center gap-2'>
        <Image
          src={owner.avatar_url}
          alt={owner.login}
          width={30}
          height={30}
          className='rounded-full'
        />
      </a>
    </li>
  );
};

export default ForkItem;
