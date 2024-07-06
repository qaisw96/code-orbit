import React, { memo } from 'react';
import Badge from '../ui/Badge';
import { IRepoCardProps } from './RepoCard.types';
import ForksList from '../Fork/ForkList';

const RepoCard: React.FC<IRepoCardProps> = ({
  name,
  html_url,
  language,
  forks,
}) => {
  return (
    <div className='rounded-md shadow-sm bg-gradient-orange p-6'>
      <div className='text-center flex flex-col gap-6'>
        <h3 className='text-xl'>{name}</h3>
        <a
          href={html_url}
          target='_blank'
          className='underline font-thin inline-block text-sm'>
          View on GitHub
        </a>
      </div>
      <div className='mt-8 flex justify-between'>
        <div>
          <h2 className='text-xs font-extralight'>Recent Forks</h2>
          <ForksList forks={forks} />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xs font-extralight'>Most Used Language</h2>
          <Badge language={language || 'Other'} />
        </div>
      </div>
    </div>
  );
};

export default memo(RepoCard);
