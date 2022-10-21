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

const books = {
  GET_ALL_BOOKS,
  NEW_BOOK,
};

export default books;
