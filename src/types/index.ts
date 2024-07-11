export interface IUserItem {
  id: number;
  avatar_url: string;
  html_url: string;
  login: string;
}

export interface IForkItem {
  id: number;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface IRepoItem {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  language: string;
  forks: IForkItem[];
}

export interface State {
  results: (IUserItem | IRepoItem)[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  forks: Record<number, IForkItem[]>;
  isForksLoading: boolean;
  forksError: string | null;
}

export type Action =
  | { type: 'SET_RESULTS'; payload: (IUserItem | IRepoItem)[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_IS_LOADING_MORE'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_FORKS'; payload: Record<number, IForkItem[]> }
  | { type: 'SET_IS_FORKS_LOADING'; payload: boolean }
  | { type: 'SET_FORKS_ERROR'; payload: string | null };
