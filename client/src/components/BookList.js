// import React from 'react';
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

  console.log(data);

  if (loading) <p>Loading...</p>;

  if (error) <p>Something went wrong!</p>;

  return (
    <div>
      <ul id='book-list'>
        <li>Book name</li>
      </ul>
    </div>
  );
};

export default BookList;
