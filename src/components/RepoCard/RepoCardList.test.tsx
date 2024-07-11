import React from 'react';
import { IRepoCardListProps } from './RepoCard.types';
import { render, screen } from '@testing-library/react';
import RepoCardList from './RepoCardList';
import '@testing-library/jest-dom';

const mockRepos: IRepoCardListProps = {
  repos: [
    {
      id: 1,
      name: 'css',
      owner: {
        login: 'primer',
        avatar_url: 'https://avatars.githubusercontent.com/u/7143434?v=4',
      },
      html_url: 'https://github.com/primer/css',
      language: 'SCSS',
      forks: [
        {
          id: 826330988,
          html_url: 'https://github.com/guirod/normalize.css',
          owner: {
            login: 'guirod',
            avatar_url: 'https://avatars.githubusercontent.com/u/30021682?v=4',
          },
        },
      ],
    },
    {
      id: 2,
      name: 'another-repo',
      owner: {
        login: 'another-user',
        avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
      },
      html_url: 'https://github.com/another-user/another-repo',
      language: 'JavaScript',
      forks: [],
    },
  ],
  forks: {
    1: [
      {
        id: 826330988,
        html_url: 'https://github.com/guirod/normalize.css',
        owner: {
          login: 'guirod',
          avatar_url: 'https://avatars.githubusercontent.com/u/30021682?v=4',
        },
      },
    ],
    2: [],
  },
};

describe('RepoCardList', () => {
  it('renders the correct number of RepoCard components', () => {
    render(<RepoCardList {...mockRepos} />);
    expect(screen.getByText('css')).toBeInTheDocument();
    expect(screen.getByText('another-repo')).toBeInTheDocument();
    expect(screen.getAllByText('View on GitHub').length).toBe(2);
  });
});
