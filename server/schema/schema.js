const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
// const books = [
//   { name: 'Famous Book ONE', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'Famous Book TWO', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'Famous Book THREE', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'Infamous Book FOUR', genre: 'Fantasy', id: '4', authorId: '2' },
//   { name: 'Infamous Book FIVE', genre: 'Fantasy', id: '5', authorId: '3' },
//   { name: 'Infamous Book SIX', genre: 'Sci-Fi', id: '6', authorId: '3' },
// ];

// const authors = [
//   { name: 'Patrick', age: 44, id: '1' },
//   { name: 'Brandon', age: 33, id: '2' },
//   { name: 'Terry', age: 22, id: '3' },
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    // TYPE RELATIONS -> w/o wrapping fn Book/AuthorType will be undefined!
    // -> NOT YET RUN!
    id: { type: GraphQLID }, // Instead of GraphQLString
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID }, // Instead of GraphQLString
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

// RootQuery -> how to INITIALLY step into Graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
