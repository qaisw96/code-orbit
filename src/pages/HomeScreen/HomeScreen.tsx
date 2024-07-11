'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { IUserItem, IRepoItem } from '@/types';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useFetchData from '@/hooks/useFetchData';
import SearchBar from '@/components/SearchBar/SearchBar';
import UserCardList from '@/components/UserCard/UserCardList';
import RepoCardList from '@/components/RepoCard/RepoCardList';
import CardsSkeleton from '@/components/ui/CardsSkeleton/CardsSkeleton';

const HomeScreen = () => {
  const { state, fetchData, loadMore, isInitialRendering } = useFetchData();
  const { results, isLoading, isLoadingMore, error, forks } = state;

  const [query, setQuery] = useState('');
  const [type, setType] = useState<'users' | 'repositories'>('users');

  const targetRef = useRef(null);

  const onSearch = useCallback(
    (searchQuery: string, searchType: 'users' | 'repositories') => {
      fetchData(searchQuery, searchType);
      setQuery(searchQuery);
      setType(searchType);
    },
    [fetchData]
  );

  useIntersectionObserver(targetRef, () => loadMore(query, type), [
    query,
    type,
    results,
  ]);

  const renderContent = useMemo(() => {
    if (isLoading) {
      return <CardsSkeleton count={12} />;
    }

    if (error) {
      return <p className='mt-10 text-white'>{error}</p>;
    }

    const isEmpty = results.length === 0;

    return (
      <>
        {type === 'users' && !isEmpty && (
          <UserCardList users={results as IUserItem[]} />
        )}
        {type === 'repositories' && !isEmpty && (
          <RepoCardList repos={results as IRepoItem[]} forks={forks} />
        )}
        {isEmpty && !isInitialRendering && (
          <p className='mt-10 text-white'>
            No {type === 'users' ? 'users' : 'repositories'} found.
          </p>
        )}
      </>
    );
  }, [isLoading, results, type, error, isInitialRendering, forks]);

  return (
    <div className='container'>
      <h2 className='mt-8 text-2xl text-white'>Code Orbit</h2>
      <p className='text-gray-300 mt-4'>
        Your one-stop-shop for out-of-this-world code searches! 🚀
      </p>
      <SearchBar onSearch={onSearch} />
      {renderContent}
      {isLoadingMore && (
        <p className='text-lg p-6 text-center text-white'>Loading more...</p>
      )}
      {isInitialRendering && (
        <p className='mt-10 text-white text-sm'>
          Select type ( users or Repos ) and enjoy searching ✨
        </p>
      )}
      <div ref={targetRef} />
    </div>
  );
};

export default HomeScreen;
