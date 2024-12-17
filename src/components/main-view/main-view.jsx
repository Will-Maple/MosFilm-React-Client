import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { UserView } from "../user-view/user-view";
import { UserDelete } from "../user-delete/user-delete"
import { Row, Col, Image } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Github from "../../img/github.svg";
import Portfolio from "../../img/portfolio.svg";
import Youtube from "../../img/youtube.svg";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  /*const movies = useSelector((state) => state.movies.movies);*/
  /*const user = useSelector((state) => state.user); */
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://mosfilm-api.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            url: doc.URL,
            director: doc.Director.Name
          };
        });

        setMovies(moviesFromApi);
        /*dispatch(setMovies(moviesFromApi));*/
      });
  }, [token]);

  let favorites = movies.filter(m => user.Favorites.includes(m.id))

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear()
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <>
                    <SignupView />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                  />
                )}
              </>
            }
          />
          <Route
            path="/movie/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty! Oh no!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty! Oh no!</Col>
                ) : (
                  <>
                    <Col md={12}>
                      <UserView
                        user={user}
                        token={token}
                        onLoggedOut={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear()
                        }}
                      />
                    </Col>
                    {favorites.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          favorites={favorites}
                          setUser={setUser}
                        />
                      </Col>
                    ))}
                    <Col md={12}>
                      <UserDelete
                        user={user}
                        token={token}
                        onLoggedOut={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear()
                        }}
                      />
                    </Col>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty! Oh no!</Col>
                ) : (
                  <>
                    <Col className="text-center mb-3" md={2}>
                      <div>
                        <a href="https://will-maple.github.io/Portfolio-Website/portfolio.html">
                          <Image src={Portfolio} alt="Portfolio Link" style={{ height: "50px", width: "100px" }} />
                        </a>
                      </div>
                      <div>
                        <a href="https://github.com/Will-Maple">
                          <Image src={Github} alt="Github Link" style={{ height: "50px", width: "50px" }} />
                        </a>
                      </div>
                    </Col>
                    <Col className="text-center mb-3" md={6}>
                      <h1 className="display-1">Доброе день</h1>
                    </Col>
                    <Col className="text-center mb-3" md={2}>
                      <div>
                        <a href="https://www.youtube.com/channel/UCm5U4zqpahzyNXBv5ZT51Jw">
                          <Image src={Youtube} alt="Youtube Link" style={{ height: "65px", width: "150px" }} />
                        </a>
                      </div>
                      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                    </Col>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          favorite={favorites}
                          setUser={setUser}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};