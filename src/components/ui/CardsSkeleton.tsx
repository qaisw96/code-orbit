import React from 'react';

interface IUserCardSkeleton {
  count?: number;
}

const CardsSkeleton = ({ count = 12 }: IUserCardSkeleton) => {
  const products = Array.from(Array(count).keys());

  return (
    <div
      className={`animate-pulse container mt-8  md:mt-7 grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
      {products.map((id) => (
        <div
          key={id}
          className='flex items-center bg-gray-100 h-[200px] p-1 md:p-1 md:px-8 rounded-md'></div>
      ))}
    </div>
  );
};

export default CardsSkeleton;
