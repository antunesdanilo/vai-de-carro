interface RatingProps {
  rating: number;
}

/**
 * Componente de avaliação (Rating) que exibe estrelas preenchidas ou vazias com base no valor de `rating`.
 *
 * @param {Object} props - Propriedades do componente
 * @param {number} props.rating - O valor da avaliação que determina o número de estrelas preenchidas.
 * Deve ser um número entre 0 e 5.
 *
 * @returns {JSX.Element} - O componente renderiza 5 ícones de estrela, onde estrelas preenchidas indicam a avaliação dada.
 *
 * Exemplos:
 * - Para uma avaliação de 3, o componente exibirá 3 estrelas preenchidas e 2 vazias.
 * - Para uma avaliação de 5, o componente exibirá todas as 5 estrelas preenchidas.
 */
const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <>
      {rating >= 1 ? (
        <i className="bi bi-star-fill text-warning"></i>
      ) : (
        <i className="bi bi-star text-warning"></i>
      )}
      {rating >= 2 ? (
        <i className="bi bi-star-fill text-warning ms-1"></i>
      ) : (
        <i className="bi bi-star text-warning ms-1"></i>
      )}
      {rating >= 3 ? (
        <i className="bi bi-star-fill text-warning ms-1"></i>
      ) : (
        <i className="bi bi-star text-warning ms-1"></i>
      )}
      {rating >= 4 ? (
        <i className="bi bi-star-fill text-warning ms-1"></i>
      ) : (
        <i className="bi bi-star text-warning ms-1"></i>
      )}
      {rating >= 5 ? (
        <i className="bi bi-star-fill text-warning ms-1"></i>
      ) : (
        <i className="bi bi-star text-warning ms-1"></i>
      )}
    </>
  );
};

export { Rating };
