import React from 'react';
import { ICardSkeleton } from './CardsSkeleton.types';

const CardsSkeleton = ({ count = 12 }: ICardSkeleton) => {
  const products = Array.from(Array(count).keys());

  return (
    <div
      className={`animate-pulse mt-8  md:mt-7 grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
      {products.map((id) => (
        <div
          key={id}
          className='flex items-center bg-gray-100 h-[200px] p-1 md:p-1 md:px-8 rounded-md'
          data-testid='skeleton-card'
        />
      ))}
    </div>
  );
};

export default CardsSkeleton;
