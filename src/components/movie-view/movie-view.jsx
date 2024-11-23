import "./movie-view.scss";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      {movie.url.length >= 5 && (
        <div className="embedded-movie">
          <iframe
            width="560"
            height="315"
            src={movie.url}
            title={movie.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      {movie.director && (<div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      )}
      {movie.description && (<div>
        <span>Descrption: </span>
        <span>{movie.description}</span>
      </div>
      )}
      <div>
        <span>URL: </span>
        <span>{movie.url}</span>
      </div>
      {movie.subs && (<div>
        <span>Subs: </span>
        <span>{movie.subs}</span>
      </div>
      )}
      {movie.genre && (<div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      )}
      <button className="back-button" onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    subs: PropTypes.shape({
      Spanish: PropTypes.bool,
      SpanishURL: PropTypes.string
    }),
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};