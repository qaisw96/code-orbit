import { IUserItem, IRepoItem, IForkItem } from '@/types';
import { initialState } from '../useFetchData/reducer';

export type IState = typeof initialState;

export type IAction =
  | { type: 'SET_RESULTS'; payload: (IUserItem | IRepoItem)[] }
  | { type: 'APPEND_RESULTS'; payload: (IUserItem | IRepoItem)[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_IS_LOADING_MORE'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_FORKS'; payload: Record<number, IForkItem[]> }
  | { type: 'SET_IS_FORKS_LOADING'; payload: boolean }
  | { type: 'SET_FORKS_ERROR'; payload: string | null };
