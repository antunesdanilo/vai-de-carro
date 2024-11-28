import { render } from '@testing-library/react';
import { Rating } from './';

describe('Rating component', () => {
  it('should display one filled star for rating 1', () => {
    const { container } = render(<Rating rating={1} />);

    // Verifica se há 1 estrela preenchida
    const filledStars = container.querySelectorAll('.bi-star-fill');
    expect(filledStars).toHaveLength(1);

    // Verifica se há 4 estrelas vazias
    const emptyStars = container.querySelectorAll('.bi-star');
    expect(emptyStars).toHaveLength(4);
  });

  it('should display three filled stars for rating 3', () => {
    const { container } = render(<Rating rating={3} />);

    const filledStars = container.querySelectorAll('.bi-star-fill');
    expect(filledStars).toHaveLength(3);

    const emptyStars = container.querySelectorAll('.bi-star');
    expect(emptyStars).toHaveLength(2);
  });

  it('should display five filled stars for rating 5', () => {
    const { container } = render(<Rating rating={5} />);

    const filledStars = container.querySelectorAll('.bi-star-fill');
    expect(filledStars).toHaveLength(5);

    const emptyStars = container.querySelectorAll('.bi-star');
    expect(emptyStars).toHaveLength(0); // Não deve haver estrelas vazias
  });

  it('should display no filled stars for rating 0', () => {
    const { container } = render(<Rating rating={0} />);

    const filledStars = container.querySelectorAll('.bi-star-fill');
    expect(filledStars).toHaveLength(0);

    const emptyStars = container.querySelectorAll('.bi-star');
    expect(emptyStars).toHaveLength(5);
  });
});
