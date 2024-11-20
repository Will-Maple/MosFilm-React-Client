import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card"

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "movie 1", author: "director1", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg" },
    { id: 2, title: "movie 2", author: "director2", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg" },
    { id: 3, title: "movie 3", author: "director3", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg" },
    { id: 4, title: "movie 4", author: "director4", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg" },
    { id: 5, title: "movie 5", author: "director5", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg" },
    { id: 6, title: "movie 6", author: "director6", image: "https://images.smiletemplates.com/uploads/screenshots/1/0000001466/poster-templates-s.jpg" }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty! Oh no!</div>
  }

  return (
    <>
      <div>
        <h1>Доброе день</h1>
        {movies.map((movie) => {
          return <MovieCard movie={movie} />;
        })}
      </div>
      <button>Test</button>
    </>
  )
}