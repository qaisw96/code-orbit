export interface IUserItem {
  id: number;
  avatar_url: string;
  html_url: string;
  login: string;
}

export interface IForkItem {
  id: number;
  username: string;
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
