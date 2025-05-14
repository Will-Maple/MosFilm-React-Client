import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import "./movie-card.scss";
import { FavButton } from "../fav-button/fav-button";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [faved, setFaved] = useState(false);

  useEffect(() => {
    const favTest = user.Favorites.includes(movie.id);
    if (favTest) {
      setFaved(true);
    } else {
      setFaved(false);
    }
  }, [user.Favorites, movie.id]);

  const getYoutubeThumb = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.pathname.split("/").pop();
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    } catch (e) {}
  };

  return (
    <Link
      to={`/movie/${encodeURIComponent(movie.id)}`}
      style={{ textDecoration: "none" }}
    >
      <Card className={"h-100 " + (faved ? "isFaved" : "notFaved")}>
        <div>
          <Card.Img variant="top" src={getYoutubeThumb(movie.url)} />
        </div>
        <Card.Body>
          <Card.Title className="noDecor">{movie.title}</Card.Title>
          <Card.Text className="noDecor">{movie.director}</Card.Text>
          <FavButton
            user={user}
            token={token}
            setUser={setUser}
            movie={movie}
          />
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
};
