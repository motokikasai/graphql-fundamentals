import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { getAuthorsQuery } from '../queries/queries';

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [state, setState] = useState({ name: '', genre: '', authorId: '' });

  if (loading) return <option disabled>Loading Authors...</option>;
  if (error) return <p>Something went wrong!</p>;

  const handleSubmitForm = e => {
    e.preventDefault();

    console.log(state);
  };

  return (
    <form id='add-book' onSubmit={handleSubmitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input
          type='text'
          // value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
      </div>

      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          // value={state.genre}
          onChange={e => setState({ ...state, genre: e.target.value })}
        />
      </div>

      <div className='field'>
        <label>Author:</label>
        <select
          // value={state.authorId}
          onChange={e => setState({ ...state, authorId: e.target.value })}
        >
          <option>Select author</option>
          {data.authors.map(author => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
