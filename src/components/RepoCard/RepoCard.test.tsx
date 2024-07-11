import React from 'react';
import { render, screen } from '@testing-library/react';
import RepoCard from './RepoCard';
import { IRepoCardProps } from './RepoCard.types';
import '@testing-library/jest-dom';

const mockRepo: IRepoCardProps = {
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
};

describe('RepoCard', () => {
  it('renders repo details correctly', () => {
    render(<RepoCard {...mockRepo} />);
    expect(screen.getByText('css')).toBeInTheDocument();
    expect(screen.getByText('View on GitHub')).toBeInTheDocument();
    expect(screen.getByText('Most Used Language')).toBeInTheDocument();
    expect(screen.getByText('SCSS')).toBeInTheDocument();
    expect(screen.getByText('Recent Forks')).toBeInTheDocument();
  });

  it('renders forks correctly', () => {
    render(<RepoCard {...mockRepo} />);
    expect(screen.getByAltText('guirod')).toBeInTheDocument();
  });
});
