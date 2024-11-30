import { useParams } from "react-router";
import { Link } from "react-router";
import "./movie-view.scss";
import PropTypes from "prop-types";
import { Col, Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  /*const movies = useSelector((state) => state.movies);*/
  const { movieId } = useParams();

  const selectedMovie = movies.find((m) => m.id === movieId);

  return (
    <div>
      {selectedMovie.url.length >= 5 && (
        <div className="embedded-movie">
          <iframe
            width="560"
            height="315"
            src={selectedMovie.url}
            title={selectedMovie.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div>
        <span>Title: </span>
        <span>{selectedMovie.title}</span>
      </div>
      {selectedMovie.director && (<div>
        <span>Director: </span>
        <span>{selectedMovie.director}</span>
      </div>
      )}
      {selectedMovie.description && (<div>
        <span>Descrption: </span>
        <span>{selectedMovie.description}</span>
      </div>
      )}
      <div>
        <span>URL: </span>
        <span>{selectedMovie.url}</span>
      </div>
      {selectedMovie.subs && (<div>
        <span>Subs: </span>
        <span>{selectedMovie.subs}</span>
      </div>
      )}
      {selectedMovie.genre && (<div>
        <span>Genre: </span>
        <span>{selectedMovie.genre}</span>
      </div>
      )}
      <Link to={`/`}>
        <Button bsPrefix="utility">Back</Button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};