export interface ISearchBarProps {
  onSearch: (query: string, type: 'users' | 'repositories') => void;
}
