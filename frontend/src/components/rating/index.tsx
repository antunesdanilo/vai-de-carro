interface RatingProps {
  rating: number;
}

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
