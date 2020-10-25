const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();

// app.get('/', (req, res) => res.send('hello Node!'));

// connect to MongoDB Atlas
const URI =
  'mongodb+srv://motokikasai:motokikasai@cluster0.6rxgf.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to database!');
});

// Middleware for GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Listen to PORT 5000
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening to port 8000...');
});
