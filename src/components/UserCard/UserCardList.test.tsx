import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserCardList from './UserCardList';
import { IUserCardProps } from './UserCard.types';

const mockUsers: IUserCardProps[] = [
  {
    id: 1,
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/user1',
    login: 'testuser1',
  },
  {
    id: 2,
    avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
    html_url: 'https://github.com/user2',
    login: 'testuser2',
  },
];

describe('UserCardList', () => {
  it('renders the correct number of UserCard components', () => {
    render(<UserCardList users={mockUsers} />);
    expect(screen.getByText('testuser1')).toBeInTheDocument();
    expect(screen.getByText('testuser2')).toBeInTheDocument();
    expect(screen.getAllByText('View on GitHub').length).toBe(2);
  });
});
