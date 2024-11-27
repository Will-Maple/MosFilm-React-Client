import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <div>
        <Card.Img variant="top" src="https://designshack.net/wp-content/uploads/placehold.jpg" />
      </div>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movie/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    director: PropTypes.string
  }).isRequired,
};