import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardsSkeleton from '@/components/ui/CardsSkeleton/CardsSkeleton';

describe('CardsSkeleton', () => {
  it('renders 12 skeleton cards by default', () => {
    render(<CardsSkeleton />);
    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards).toHaveLength(12);
  });

  it('renders the specified number of skeleton cards', () => {
    render(<CardsSkeleton count={5} />);
    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards).toHaveLength(5);
  });

  it('applies correct classes to skeleton cards', () => {
    render(<CardsSkeleton count={3} />);
    const skeletonCards = screen.getAllByTestId('skeleton-card');
    skeletonCards.forEach((card) => {
      expect(card).toHaveClass(
        'flex items-center bg-gray-100 h-[200px] p-1 md:p-1 md:px-8 rounded-md'
      );
    });
  });
});
