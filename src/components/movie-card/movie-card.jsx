import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";

export const MovieCard = ({ movie, user, token }) => {
  const [Favorite, setFavorite] = useState(false);
  const username = user.Username;

  const handleAdd = () => addFavorite(movie.id);
  const handleRemove = () => removeFavorite(movie.id);

  const removeFavorite = (fav) => {
    let index = user.Favorites.indexOf(fav);
    user.Favorites.splice(index, 1);
    fetch(`https://mosfilm-api.onrender.com/users/${username}/movies/${fav}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Favorite was Removed")
      }
    }
    );
  };

  const addFavorite = (fav) => {
    user.Favorites.push(fav);
    fetch(`https://mosfilm-api.onrender.com/users/${username}/movies/${fav}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Favorite was Added")
      }
    }
    );
  }

  return (
    <Card className="h-100">
      <div>
        <Card.Img variant="top" src="https://designshack.net/wp-content/uploads/placehold.jpg" />
      </div>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director} + {movie.id}</Card.Text>
        <Link to={`/movie/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variety="primary" onClick={handleAdd} >Add Fave!</Button>
        <Button variety="secondary" onClick={handleRemove} >Remove?</Button>
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