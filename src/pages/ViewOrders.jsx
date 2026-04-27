import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import MyCard from "../components/MyCard";

function ViewOrders() {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase
        .fetchMyBooks(firebase.user.uid)
        .then((books) => setBooks(books.docs));
  }, [firebase]);

  if (!firebase.isLoggedIn) return <h1>Please login</h1>;

  return (
    <div>
      <h1>Orders</h1>
      {books.map((book) => (
        <MyCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
}

export default ViewOrders;
