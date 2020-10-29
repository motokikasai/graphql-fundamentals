import { gql, useQuery } from '@apollo/client';

const getBooksQuery = gql`
  {
    books {
      name
      id
      author {
        name
      }
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  console.log(data?.books);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <ul id='book-list'>
      {data.books.map(book => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default BookList;
