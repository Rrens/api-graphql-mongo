import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
// memanggil gql dan apollo cliet
import { NEW_BOOK } from "../gql/books";
import { useMutation } from "@apollo/client";

export default function Form(props) {
  const history = useNavigate();
  // console.log(useNavigate());
  const [newBook, { loading, error }] = useMutation(NEW_BOOK);
  async function onSubmit(event) {
    event.preventDefault();
    // console.log(event);
    const payload = {};
    for (let index = 0; index < event.target.length; index++) {
      // event.target bisa dilihat di console.log
      const element = event.target[index];
      // diliat jika nodename === input (berasal dari atribut html input) maka value ditampung di object payload
      if (element.nodeName === "INPUT") payload[element.name] = element.value;
    }

    try {
      const resp = await newBook({
        variables: {
          ...payload,
          release_year: Number(payload.release_year),
        },
      });
      // if (resp) history("/books");
      console.log(resp);
    } catch (error) {
      console.log(`error di ${error}`);
    }

    // console.log(payload);
  }

  return (
    <Fragment>
      <h1>
        <Link to="/books" style={{ fontSize: 12 }}>{`(<= Back)`}</Link> Formulir
        Penambahan Buku
      </h1>
      <form id="form-book" style={{ maxWidth: 500 }} onSubmit={onSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="title">Title:</label>
          <input id="title" name="title" type="text" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="author">author:</label>
          <input id="author" name="author" type="text" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="description">description:</label>
          <input id="description" name="description" type="text" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="release_year">release_year:</label>
          <input id="release_year" name="release_year" type="number" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="genre">genre:</label>
          <input id="genre" name="genre" type="text" />
        </div>

        <button type="button" onClick={() => history("/books")}>
          Back
        </button>
        <button type="submit" style={{ marginLeft: "5px" }}>
          Save
        </button>
      </form>
    </Fragment>
  );
}
