import { IForkItem, IRepoItem, IUserItem } from '@/types';
import { IAction, IState } from './types';

export const initialState = {
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

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'APPEND_RESULTS':
      return { ...state, results: [...state.results, ...action.payload] };
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
