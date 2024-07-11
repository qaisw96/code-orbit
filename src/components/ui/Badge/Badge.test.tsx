import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '@/components/ui/Badge/Badge';
import '@testing-library/jest-dom/extend-expect';

describe('Badge', () => {
  const renderBadge = (language: string) =>
    render(<Badge language={language} />);

  it('renders the language name', () => {
    renderBadge('JavaScript');
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('applies correct class for JavaScript', () => {
    renderBadge('JavaScript');
    expect(screen.getByText('JavaScript')).toHaveClass(
      'bg-yellow-700 text-white'
    );
  });

  it('applies correct class for TypeScript', () => {
    renderBadge('TypeScript');
    expect(screen.getByText('TypeScript')).toHaveClass(
      'bg-blue-700 text-white'
    );
  });

  it('applies correct class for Python', () => {
    renderBadge('Python');
    expect(screen.getByText('Python')).toHaveClass('bg-green-700 text-white');
  });

  it('applies correct class for Java', () => {
    renderBadge('Java');
    expect(screen.getByText('Java')).toHaveClass('bg-red-700 text-white');
  });

  it('applies correct class for Ruby', () => {
    renderBadge('Ruby');
    expect(screen.getByText('Ruby')).toHaveClass('bg-red-900 text-white');
  });

  it('applies correct class for HTML', () => {
    renderBadge('HTML');
    expect(screen.getByText('HTML')).toHaveClass('bg-purple-700 text-white');
  });

  it('applies correct class for CSS', () => {
    renderBadge('CSS');
    expect(screen.getByText('CSS')).toHaveClass('bg-purple-700 text-white');
  });

  it('applies default class for unknown language', () => {
    renderBadge('Unknown');
    expect(screen.getByText('Unknown')).toHaveClass('bg-gray-700 text-white');
  });
});
