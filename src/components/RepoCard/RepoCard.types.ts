import { IForkItem, IRepoItem } from '@/types';

export type IRepoCardProps = IRepoItem;

export interface IRepoCardListProps {
  repos: IRepoCardProps[];
  forks: Record<number, IForkItem[]>;
}
