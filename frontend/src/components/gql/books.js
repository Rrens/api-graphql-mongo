import { gql } from "@apollo/client";

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
  NEW_BOOK,
};

export default books;
