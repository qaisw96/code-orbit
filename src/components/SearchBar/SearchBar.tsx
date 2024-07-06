'use client';

import React, { useState, useEffect, memo } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { ISearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'users' | 'repositories'>('users');

  const handleSearch = () => {
    if (!query) return;
    onSearch(query, type);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as 'users' | 'repositories');
  };

  useDebounce(handleSearch, 700, [query]);

  useEffect(() => {
    setQuery('');
  }, [type]);

  return (
    <form className='flex mt-8 gap-4'>
      <select
        value={type}
        onChange={handleTypeChange}
        className='rounded p-3 w-32 '>
        <option value='users'>Users</option>
        <option value='repositories'>Repos</option>
      </select>
      <input
        value={query}
        onChange={handleQueryChange}
        className='rounded p-3 '
        placeholder={`Search ${type}`}
        aria-label={`Search for ${type}`}
      />
    </form>
  );
};

export default memo(SearchBar);
