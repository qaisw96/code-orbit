import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '@/components/SearchBar/SearchBar';
import { ISearchBarProps } from './SearchBar.types';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  const setup = (props: Partial<ISearchBarProps> = {}) => {
    render(<SearchBar onSearch={mockOnSearch} {...props} />);
  };

  it('renders the input and select elements', () => {
    setup();

    expect(screen.getByPlaceholderText('Search users')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('resets query when type is changed', () => {
    setup();

    const input = screen.getByPlaceholderText('Search users');
    fireEvent.change(input, { target: { value: 'test' } });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'repositories' } });

    expect(input).toHaveValue('');
  });
});
