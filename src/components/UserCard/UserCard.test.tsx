import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';
import { IUserCardProps } from './UserCard.types';

const mockUser: IUserCardProps = {
  id: 1,
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  html_url: 'https://github.com/user',
  login: 'testuser',
};

describe('UserCard', () => {
  it('renders user details correctly', () => {
    render(<UserCard {...mockUser} />);
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('View on GitHub')).toBeInTheDocument();
    expect(screen.getByAltText('testuser')).toBeInTheDocument();
  });
});
