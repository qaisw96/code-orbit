import React from 'react';
import RepoCard from './RepoCard';
import { IRepoCardListProps } from './RepoCard.types';

const RepoCardList: React.FC<IRepoCardListProps> = ({ repos }) => (
  <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
    {repos?.map((repo) => (
      <RepoCard key={repo.id} {...repo} />
    ))}
  </div>
);

export default RepoCardList;
