import { useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { GET_ALL_BOOKS } from "../gql/books";

export default function List() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return "Loading ...";
  }
  console.log(error);
  if (error) {
    return error?.graphQLErrors.map((error) => error) ?? error.networkError;
  }

  // Check data dari graphQL
  if (data.getAllBooks === 0)
    return (
      <h1>
        Belum ada buku yang terdaftarkan{" "}
        <Link to={"/books/new"}>Buat baru</Link>
      </h1>
    );

  return (
    <Fragment>
      <h1>
        List Buku
        <Link to="/books/new" style={{ fontSize: 12 }}>
          (+ Buat Baru)
        </Link>
      </h1>
      {data.getAllBooks.map((item) => {
        return <div key={item._id}>{item.title}</div>;
      })}
    </Fragment>
  );
}
