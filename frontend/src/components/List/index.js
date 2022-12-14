import { useMutation, useQuery } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { GET_ALL_BOOKS, DELETE_BOOK } from "../gql/books";

export default function List() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });

  const [iD, setId] = useState(null);

  const [deleteBook, { loading: loadingDelete }] = useMutation(DELETE_BOOK, {
    refetchQueries: [GET_ALL_BOOKS],
    onError: (res) => {
      console.log(res.networkError);
    },
  });

  function fnDelete(_id) {
    setId(_id);
    deleteBook({
      variables: {
        _id,
      },
    });
    console.log(`iki cuy: ${_id}`);
  }

  if (loading) {
    return "Loading ...";
  }
  // console.log(GET_ALL_BOOKS);
  if (error) {
    return error?.graphQLErrors.map((error) => error) ?? error.networkError;
  }

  function tidakAdaBuku() {
    return (
      <h1>
        Belum ada buku yang terdaftarkan{" "}
        <Link to={"/books/new"}>Buat baru</Link>
      </h1>
    );
  }

  function adaBuku() {
    return (
      <h1>
        List Buku
        <Link to="/books/new" style={{ fontSize: 12 }}>
          (+ Buat Baru)
        </Link>
      </h1>
    );
  }
  // Check data dari graphQL
  // if (data.getAllBooks === 0) {
  // }

  console.log(data);
  return (
    <Fragment>
      {data.getAllBooks.length === 0 ? tidakAdaBuku() : adaBuku()}
      <h1>
        {/* List Buku
        <Link to="/books/new" style={{ fontSize: 12 }}>
          (+ Buat Baru)
        </Link> */}
      </h1>
      {data.getAllBooks.map((item) => {
        return (
          <div key={item._id}>
            {item.title}
            <Link
              to={`/books/${item._id}/edit`}
              style={{ marginLeft: "10px", marginRight: "5px" }}
            >
              Edit
            </Link>
            (
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => fnDelete(item._id)}
              // onClick={console.log(`dele: ${item._id}`)}
            >
              {iD === item._id && loadingDelete ? "Deleting..." : "Delete"}
            </span>
            )
          </div>
        );
      })}
    </Fragment>
  );
}
