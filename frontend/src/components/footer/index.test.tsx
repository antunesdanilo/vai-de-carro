import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './index.tsx';

describe('Footer component', () => {
  it('renders footer correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/Footer/)).toBeInTheDocument();
  });
});
