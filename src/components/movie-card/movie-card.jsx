import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [faved, setFaved] = useState(false);
  const username = user.Username;

  useEffect(() => {
    let favTest = user.Favorites.indexOf(movie.id);
    if (favTest === -1) {
      setFaved(false);
    } else {
      setFaved(true);
    }
  }, [user.Favorites, movie.id])

  const handleAdd = (event) => {
    event.preventDefault();
    addFavorite(movie.id);
  }

  const handleRemove = (event) => {
    event.preventDefault();
    removeFavorite(movie.id);
  }

  const removeFavorite = (fav) => {
    let index = user.Favorites.indexOf(fav);
    let updatedFavorites = [...user.Favorites];
    updatedFavorites.splice(index, 1);
    const updatedUser = { ...user, Favorites: updatedFavorites };
    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));

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
    const updatedFavorites = [...user.Favorites, fav];
    const updatedUser = { ...user, Favorites: updatedFavorites };
    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));

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

  const getYoutubeThumb = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.pathname.split('/').pop();
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    } catch (e) {
    }
  };

  return (
    <Link to={`/movie/${encodeURIComponent(movie.id)}`} style={{ textDecoration: 'none' }}>
      <Card className={"h-100 " + (faved ? "isFaved" : "notFaved")}>
        <div>
          <Card.Img variant="top" src={getYoutubeThumb(movie.url)} />
        </div>
        <Card.Body>
          <Card.Title className="noDecor">{movie.title}</Card.Title>
          <Card.Text className="noDecor">{movie.director}</Card.Text>
          {!faved ? (
            <Button variety="primary" bsPrefix="handleAdd" onClick={(event) => handleAdd(event)} >Add Fave!</Button>
          ) : (
            <Button variety="secondary" bsPrefix="handleRemove" onClick={(event) => handleRemove(event)} >Remove?</Button>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    director: PropTypes.string
  }).isRequired,
};