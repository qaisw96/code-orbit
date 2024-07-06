import { useCallback, useRef, useState } from 'react';
import { getRepoForks, searchGithub } from '@/services/api';
import { IUserItem, IRepoItem } from '@/types';

const useFetchData = () => {
  const [results, setResults] = useState<(IUserItem | IRepoItem)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const isInitialRendering = useRef(true);

  const fetchRepoForks = useCallback(async (repos: IRepoItem[]) => {
    try {
      const repoResults = await Promise.all(
        repos.map(async (repo) => ({
          ...repo,
          forks: await getRepoForks(repo.owner.login, repo.name),
        }))
      );
      return repoResults;
    } catch {
      return repos;
    }
  }, []);

  const fetchData = useCallback(
    async (searchQuery: string, searchType: 'users' | 'repositories') => {
      isInitialRendering.current = false;
      setIsLoading(true);
      setError(null);

      try {
        let data = await searchGithub(
          searchQuery,
          searchType as 'users' | 'repositories'
        );
        if (searchType === 'repositories') {
          data = await fetchRepoForks(data as IRepoItem[]);
        }
        setResults(data);
        setIsLoading(false);
        setHasMore(data.length > 0);
        setPage(1);
      } catch (error) {
        setError('Oops! Something went wrong. Please try again later.');
        setIsLoading(false);
      }
    },
    [fetchRepoForks]
  );

  const loadMore = useCallback(
    async (query: string, type: 'users' | 'repositories') => {
      if (
        isLoadingMore ||
        isInitialRendering.current ||
        !hasMore ||
        results?.length === 0
      )
        return;

      setIsLoadingMore(true);

      try {
        let newResults = await searchGithub(query, type, page + 1);
        if (type === 'repositories' && newResults.length > 1) {
          newResults = await fetchRepoForks(newResults as IRepoItem[]);
        }
        setResults((prevResults) => [...prevResults, ...newResults]);
        setIsLoadingMore(false);
        if (newResults.length === 0) setHasMore(false);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        setError('Oops! Something went wrong. Please try again later.');
        setIsLoadingMore(false);
      }
    },
    [isLoadingMore, isInitialRendering, hasMore, page, fetchRepoForks, results]
  );

  return {
    results,
    isLoading,
    isLoadingMore,
    error,
    fetchData,
    loadMore,
    isInitialRendering,
  };
};

export default useFetchData;
