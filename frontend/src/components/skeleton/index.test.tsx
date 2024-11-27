import { render } from '@testing-library/react';
import { Skeleton } from '.';

describe('Skeleton component', () => {
  it('should render the correct number of skeleton rows based on repeat', () => {
    // A função render retorna um objeto, e o container está dentro desse objeto
    const { container } = render(<Skeleton repeat={3} />);

    // Seleciona todos os elementos com a classe 'skeleton'
    const skeletons = container.querySelectorAll('.skeleton');

    // Verifica se o número de elementos com a classe 'skeleton' é igual ao valor de 'repeat'
    expect(skeletons).toHaveLength(3);
  });

  it('should apply the correct width to skeleton rows', () => {
    const { container } = render(<Skeleton width="200px" repeat={3} />);

    const skeletons = container.querySelectorAll('.skeleton');

    expect(skeletons[0]).toHaveStyle('width: 200px');
    expect(skeletons[1]).toHaveStyle('width: 200px');
  });

  it('should apply the correct height to skeleton rows', () => {
    const { container } = render(<Skeleton height="30px" repeat={2} />);

    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons[0]).toHaveStyle('height: 30px');
    expect(skeletons[1]).toHaveStyle('height: 30px');
  });

  it('should apply default width and height when not provided', () => {
    const { container } = render(<Skeleton repeat={2} />);

    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons[0]).toHaveStyle('width: 100%');
    expect(skeletons[1]).toHaveStyle('width: 100%');
    expect(skeletons[0]).toHaveStyle('height: 20px');
    expect(skeletons[1]).toHaveStyle('height: 20px');
  });
});
