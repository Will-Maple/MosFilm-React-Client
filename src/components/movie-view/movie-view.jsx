import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    director: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    subs: PropTypes.shape({
      Spanish: PropTypes.bool,
      SpanishURL: PropTypes.string
    }),
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};