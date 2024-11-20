import React from "react";
import { useState } from "react";

export const MainView = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "movie 1" },
    { id: 2, title: "movie 2" },
    { id: 3, title: "movie 3" },
    { id: 4, title: "movie 4" },
    { id: 5, title: "movie 5" },
    { id: 6, title: "movie 6" }
  ]);

  if (books.length === 0) {
    return <div>The list is empty! Oh no!</div>
  }

  return (
    <>
      <div>
        <h1>Доброе день</h1>
        {books.map((book) => {
          return <div key={book.id}>{book.title}</div>;
        })}
      </div>
      <button>Test</button>
    </>
  )
}