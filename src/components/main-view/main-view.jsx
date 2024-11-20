import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "movie 1", director: "director1", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg", description: "pretty, pretty good", URL: "#", Subs: "none", Genre: "none" },
    { id: 2, title: "movie 2", director: "director2", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg", description: "pretty, pretty good", URL: "#", Subs: "none", Genre: "none" },
    { id: 3, title: "movie 3", director: "director3", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg", description: "pretty, pretty good", URL: "#", Subs: "none", Genre: "none" },
    { id: 4, title: "movie 4", director: "director4", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg", description: "pretty, pretty good", URL: "#", Subs: "none", Genre: "none" },
    { id: 5, title: "movie 5", director: "director5", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg", description: "pretty, pretty good", URL: "#", Subs: "none", Genre: "none" },
    { id: 6, title: "movie 6", director: "director6", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg", description: "pretty, pretty good", URL: "#", Subs: "none", Genre: "none" }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty! Oh no!</div>
  }

  return (
    <div>
      <h1>Доброе день</h1>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};