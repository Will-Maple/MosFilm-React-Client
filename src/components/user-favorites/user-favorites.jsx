import { MovieCard } from "../movie-card/movie-card"
import { Col } from "react-bootstrap"

export const UserFavorites = ({ user, movies, token }) => {
  let favorites = movies.filter(m => user.Favorites.includes(m.id))

  return (
    <>
      {favorites.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard
            movie={movie}
            user={user}
            token={token}
          />
        </Col>
      ))}
    </>
  )
}