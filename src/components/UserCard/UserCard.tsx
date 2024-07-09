import React, { memo } from 'react';
import Image from 'next/image';
import { IUserCardProps } from './UserCard.types';

const UserCard: React.FC<IUserCardProps> = ({
  avatar_url,
  login,
  html_url,
}) => (
  <div className='gap-3 items-center rounded-md shadow-sm relative bg-white'>
    <div className='h-20 text-center relative flex justify-center bg-gradient-orange rounded-s-md rounded-e-md'>
      <Image
        src={avatar_url}
        alt={login}
        width={70}
        height={70}
        className='rounded-full absolute top-10'
      />
    </div>
    <div className='py-8 text-center mt-2'>
      <h3>{login}</h3>
      <a
        href={html_url}
        target='_blank'
        className='underline font-thin inline-block mt-6 text-sm'>
        View on GitHub
      </a>
    </div>
  </div>
);

export default memo(UserCard);
