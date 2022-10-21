import React, { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// memanggil gql dan apollo cliet
import { GET_BOOK_DETAIL, NEW_BOOK, UPDATE_BOOK } from "../gql/books";
import { useLazyQuery, useMutation } from "@apollo/client";

export default function Form(props) {
  const history = useNavigate();

  const params = useParams();
  // console.log(useNavigate());
  // console.dir(params);
  const [newBook, { loading: loadingNewBook, error: errorNewBook }] =
    useMutation(NEW_BOOK);

  const [updateBook, { loading: loadingUpdateBook, error: errorUpdateBook }] =
    useMutation(UPDATE_BOOK);

  // use Lazy Query untuk update data
  const [
    getBookDetail,
    { loading: loadingBook, error: errorBook, data: dataBook },
  ] = useLazyQuery(GET_BOOK_DETAIL, {
    variables: { _id: params.id },
  });

  // console.log(GET_BOOK_DETAIL);

  async function onSubmit(event) {
    event.preventDefault();

    const payload = {};
    for (let index = 0; index < event.target.length; index++) {
      // event.target bisa dilihat di console.log
      const element = event.target[index];
      // diliat jika nodename === input (berasal dari atribut html input) maka value ditampung di object payload
      if (element.nodeName === "INPUT") payload[element.name] = element.value;
      // console.dir(element);
      console.log(element.value);
    }

    if (params.id) {
      try {
        const resp = await updateBook({
          variables: {
            ...payload,
            _id: params.id,
            release_year: Number(payload.release_year),
          },
        });
        // if (resp) history("/books");
        // console.log(resp);
      } catch (error) {
        console.log(`error di ${error}`);
      }
    } else {
      try {
        const resp = await newBook({
          variables: {
            ...payload,
            release_year: Number(payload.release_year),
          },
        });
        // if (resp) history("/books");
        // console.log(resp);
      } catch (error) {
        console.log(`error di ${error}`);
      }
    }

    // console.log(payload);

    // ketika params.id ada maka jalankan getbookdetail
  }
  useEffect(() => {
    if (params.id) getBookDetail();
  }, [params.id, getBookDetail]);

  // menangkap state yang berubah
  // jika ada perubahan di data

  useEffect(() => {
    if (dataBook) {
      const form = document.getElementById("form-book");

      for (let index = 0; index < form.length; index++) {
        const element = form[index];

        // console.dir(element.nodeName);

        // UNTUK databook ambil langsung dari db
        if (element.nodeName === "INPUT") {
          element.value = dataBook.getBook[element.name];
          // console.log(dataBook.getBookDetail);
        }
      }
    }
  }, [dataBook]);

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
