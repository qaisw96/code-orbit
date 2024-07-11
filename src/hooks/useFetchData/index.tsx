import { useCallback, useReducer, useRef } from 'react';
import { getRepoForks, searchGithub } from '@/services/api';
import { IUserItem, IRepoItem, IForkItem } from '@/types';
import { initialState, reducer } from './reducer';

const useFetchData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isInitialRendering = useRef(true);
  const cache = useRef<
    Record<string, Record<number, (IUserItem | IRepoItem)[]>>
  >({});

  const fetchRepoForks = useCallback(async (repos: IRepoItem[]) => {
    dispatch({ type: 'SET_IS_FORKS_LOADING', payload: true });
    dispatch({ type: 'SET_FORKS_ERROR', payload: null });

    try {
      const forksMap: Record<number, IForkItem[]> = {};

      await Promise.all(
        repos.map(async (repo) => {
          const forks = await getRepoForks(repo.owner.login, repo.name);
          forksMap[repo.id] = forks;
        })
      );

      dispatch({ type: 'SET_FORKS', payload: forksMap });
    } catch {
      dispatch({ type: 'SET_FORKS_ERROR', payload: 'Failed to load forks.' });
    } finally {
      dispatch({ type: 'SET_IS_FORKS_LOADING', payload: false });
    }
  }, []);

  const fetchData = useCallback(
    async (
      searchQuery: string,
      searchType: 'users' | 'repositories',
      page = 1
    ) => {
      isInitialRendering.current = false;
      dispatch({ type: 'SET_IS_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const cacheKey = `${searchType}-${searchQuery}`;
      if (cache.current[cacheKey] && cache.current[cacheKey][page]) {
        dispatch({
          type: 'SET_RESULTS',
          payload: cache.current[cacheKey][page],
        });
        dispatch({ type: 'SET_IS_LOADING', payload: false });
        return;
      }

      try {
        let data = await searchGithub(searchQuery, searchType, page);
        if (!cache.current[cacheKey]) {
          cache.current[cacheKey] = {};
        }
        cache.current[cacheKey][page] = data;
        if (searchType === 'repositories') {
          fetchRepoForks(data as IRepoItem[]);
        }
        dispatch({ type: 'SET_RESULTS', payload: data });
        dispatch({ type: 'SET_HAS_MORE', payload: data.length > 0 });
        dispatch({ type: 'SET_PAGE', payload: page });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Oops! Something went wrong. Please try again later.',
        });
      } finally {
        dispatch({ type: 'SET_IS_LOADING', payload: false });
      }
    },
    [fetchRepoForks]
  );

  const loadMore = useCallback(
    async (query: string, type: 'users' | 'repositories') => {
      if (
        state.isLoadingMore ||
        isInitialRendering.current ||
        !state.hasMore ||
        state.results.length === 0
      )
        return;

      const nextPage = state.page + 1;
      dispatch({ type: 'SET_IS_LOADING_MORE', payload: true });

      const cacheKey = `${type}-${query}`;
      if (cache.current[cacheKey] && cache.current[cacheKey][nextPage]) {
        dispatch({
          type: 'APPEND_RESULTS',
          payload: cache.current[cacheKey][nextPage],
        });
        dispatch({ type: 'SET_PAGE', payload: nextPage });
        dispatch({ type: 'SET_IS_LOADING_MORE', payload: false });
        return;
      }

      try {
        let newResults = await searchGithub(query, type, nextPage);
        const updatedResults = [...state.results, ...newResults];
        if (!cache.current[cacheKey]) {
          cache.current[cacheKey] = {};
        }
        cache.current[cacheKey][nextPage] = newResults;

        dispatch({
          type: 'APPEND_RESULTS',
          payload: updatedResults,
        });

        if (type === 'repositories' && newResults.length > 1) {
          fetchRepoForks(newResults as IRepoItem[]);
        }
        if (newResults.length === 0)
          dispatch({ type: 'SET_HAS_MORE', payload: false });
        dispatch({ type: 'SET_PAGE', payload: nextPage });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Oops! Something went wrong. Please try again later.',
        });
      } finally {
        dispatch({ type: 'SET_IS_LOADING_MORE', payload: false });
      }
    },
    [state, fetchRepoForks]
  );

  return {
    state,
    fetchData,
    loadMore,
    isInitialRendering: isInitialRendering.current,
  };
};

export default useFetchData;
