import "./fav-button.scss";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export const FavButton = ({ user, token, setUser, movie }) => {
  const [faved, setFaved] = useState(false);

  useEffect(() => {
    const favTest = user.Favorites.includes(movie.id);
    if (favTest) {
      setFaved(true);
    } else {
      setFaved(false);
    }
  }, [user.Favorites, movie.id]);

  const username = user.Username;

  const handleAdd = (event) => {
    event.preventDefault();
    addFavorite(movie.id);
  };

  const handleRemove = (event) => {
    event.preventDefault();
    removeFavorite(movie.id);
  };

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
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        alert("Favorite was Removed");
      }
    });
  };

  const addFavorite = (fav) => {
    const updatedFavorites = [...user.Favorites, fav];
    const updatedUser = { ...user, Favorites: updatedFavorites };
    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));

    fetch(`https://mosfilm-api.onrender.com/users/${username}/movies/${fav}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        alert("Favorite was Added");
      }
    });
  };

  return (
    <>
      {!faved ? (
        <Button
          variety="primary"
          bsPrefix="handleAdd"
          onClick={(event) => handleAdd(event)}
        >
          Add Fave!
        </Button>
      ) : (
        <Button
          variety="secondary"
          bsPrefix="handleRemove"
          onClick={(event) => handleRemove(event)}
        >
          Remove?
        </Button>
      )}
    </>
  );
};
