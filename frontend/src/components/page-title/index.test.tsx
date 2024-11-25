import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PageTitle } from '.';

const titulo = 'Título Fake';

describe('Footer component', () => {
  it('renders footer correctly', () => {
    render(<PageTitle title={titulo} />);
    // Verifica a presença de um heading (h1) com o texto "Título Fake"
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(titulo);
  });
});
