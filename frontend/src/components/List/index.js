import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function List() {
  return (
    <Fragment>
      <h1>
        List Buku
        <Link to="/books/new" style={{ fontSize: 12 }}>
          (+ Buat Baru)
        </Link>
      </h1>
    </Fragment>
  );
}
