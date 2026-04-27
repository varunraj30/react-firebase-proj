import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import MyCard from "../components/MyCard";
import CardGroup from "react-bootstrap/CardGroup";

function Home() {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();
  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((book) => (
          <MyCard
            key={book.id}
            id={book.id}
            {...book.data()}
            link={`/book/view/${book.id}`}
          />
        ))}
      </CardGroup>
    </div>
  );
}

export default Home;
