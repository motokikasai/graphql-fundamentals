import BookList from './components/BookList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>GraphQL APP</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
};

export default App;
