export interface IForkOwner {
  login: string;
  avatar_url: string;
}

export interface IForkItem {
  id: number;
  html_url: string;
  owner: IForkOwner;
}

export interface IForksListProps {
  forks: IForkItem[];
}
