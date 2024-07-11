import { useCallback, useReducer, useRef } from 'react';
import { getRepoForks, searchGithub } from '@/services/api';
import { IUserItem, IRepoItem, IForkItem } from '@/types';

const initialState = {
  results: [] as (IUserItem | IRepoItem)[],
  isLoading: false,
  isLoadingMore: false,
  error: null as string | null,
  hasMore: true,
  page: 1,
  forks: {} as Record<number, IForkItem[]>,
  isForksLoading: false,
  forksError: null as string | null,
};

type State = typeof initialState;

type Action =
  | { type: 'SET_RESULTS'; payload: (IUserItem | IRepoItem)[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_IS_LOADING_MORE'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_FORKS'; payload: Record<number, IForkItem[]> }
  | { type: 'SET_IS_FORKS_LOADING'; payload: boolean }
  | { type: 'SET_FORKS_ERROR'; payload: string | null };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_IS_LOADING_MORE':
      return { ...state, isLoadingMore: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_FORKS':
      return { ...state, forks: { ...state.forks, ...action.payload } };
    case 'SET_IS_FORKS_LOADING':
      return { ...state, isForksLoading: action.payload };
    case 'SET_FORKS_ERROR':
      return { ...state, forksError: action.payload };
    default:
      return state;
  }
};

const useFetchData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isInitialRendering = useRef(true);

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
    async (searchQuery: string, searchType: 'users' | 'repositories') => {
      isInitialRendering.current = false;
      dispatch({ type: 'SET_IS_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        let data = await searchGithub(searchQuery, searchType);
        if (searchType === 'repositories') {
          fetchRepoForks(data as IRepoItem[]);
        }
        dispatch({ type: 'SET_RESULTS', payload: data });
        dispatch({ type: 'SET_HAS_MORE', payload: data.length > 0 });
        dispatch({ type: 'SET_PAGE', payload: 1 });
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

      dispatch({ type: 'SET_IS_LOADING_MORE', payload: true });

      try {
        let newResults = await searchGithub(query, type, state.page + 1);
        dispatch({
          type: 'SET_RESULTS',
          payload: [...state.results, ...newResults],
        });

        if (type === 'repositories' && newResults.length > 1) {
          fetchRepoForks(newResults as IRepoItem[]);
        }
        if (newResults.length === 0)
          dispatch({ type: 'SET_HAS_MORE', payload: false });
        dispatch({ type: 'SET_PAGE', payload: state.page + 1 });
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
