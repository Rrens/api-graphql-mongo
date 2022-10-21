import { gql } from "@apollo/client";

// FUNCTION GET BOOKS
export const GET_ALL_BOOKS = gql`
  query GetAllBooks {
    getAllBooks {
      _id
      title
    }
  }
`;

export const GET_BOOK_DETAIL = gql`
  query GetBook($_id: ID!) {
    getBook(_id: $_id) {
      _id
      title
      author
      description
      release_year
      genre
    }
  }
`;

// mutation diawal untuk di front end.
// sedangkan di object untuk memanggil graphql
export const NEW_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $description: String
    $release_year: Int!
    $genre: String!
  ) {
    createBook(
      title: $title
      author: $author
      description: $description
      release_year: $release_year
      genre: $genre
    ) {
      _id
      title
      author
      description
      release_year
      genre
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $_id: ID!
    $title: String!
    $author: String!
    $description: String
    $release_year: Int!
    $genre: String!
  ) {
    updateBook(
      _id: $_id
      title: $title
      author: $author
      description: $description
      release_year: $release_year
      genre: $genre
    ) {
      _id
      title
      author
      description
      release_year
      genre
    }
  }
`;

const books = {
  GET_ALL_BOOKS,
  GET_BOOK_DETAIL,
  UPDATE_BOOK,
  NEW_BOOK,
};

export default books;
