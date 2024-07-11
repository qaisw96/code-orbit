import React from 'react';
import { render, screen } from '@testing-library/react';
import { IForkItem } from './Fork.types';
import ForkItem from './ForkItem';
import '@testing-library/jest-dom';

const mockFork: IForkItem = {
  id: 826330988,
  html_url: 'https://github.com/guirod/normalize.css',
  owner: {
    login: 'guirod',
    avatar_url: 'https://avatars.githubusercontent.com/u/30021682?v=4',
  },
};

describe('ForkItem', () => {
  it('renders fork details correctly', () => {
    render(<ForkItem {...mockFork} />);
    expect(screen.getByAltText('guirod')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/guirod/normalize.css'
    );
  });
});
