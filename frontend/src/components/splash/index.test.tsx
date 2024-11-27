import { render, screen } from '@testing-library/react';
import { Splash } from '.';

describe('Splash component', () => {
  it('should render the loading text and spinner', () => {
    const { container } = render(<Splash />);

    // Verifica se o texto "Carregando" está na tela
    expect(screen.getByText('Carregando')).toBeInTheDocument();

    // Verifica se o componente ReactLoading foi renderizado com a classe 'loading'
    const loadingSpinner = container.querySelector('.loading');
    expect(loadingSpinner).toBeInTheDocument();
  });
});
