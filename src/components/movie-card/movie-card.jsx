import PropTypes from "prop-types";
import { Button, Card, CardImg } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <div>
        <CardImg variant="top" src="https://designshack.net/wp-content/uploads/placehold.jpg" />
      </div>
      <Card.Body onClick={() => onMovieClick(movie)}>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button>
          Modal?
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};