import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navbar } from './index.tsx';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar component', () => {
  it('should have a link for My Rides and an image with the logo', () => {
    console.warn = () => {};

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Testando se o link "Minhas Viagens" está presente
    const myRIdesLink = screen.getByText('Minhas Viagens');
    expect(myRIdesLink).toBeInTheDocument();

    // Testando se a imagem com a logo está presente
    const logo = screen.getByTestId('brand');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
  });
});
