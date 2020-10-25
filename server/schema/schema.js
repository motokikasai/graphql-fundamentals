const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// dummy data
const books = [
  { name: 'Famous Book ONE', genre: 'Fantasy', id: '1' },
  { name: 'Famous Book TWO', genre: 'Fantasy', id: '2' },
  { name: 'Famous Book THREE', genre: 'Sci-Fi', id: '3' },
];

const authors = [
  { name: 'Patrick', age: 44, id: '1' },
  { name: 'Brandon', age: 33, id: '2' },
  { name: 'Terry', age: 22, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID }, // Instead of GraphQLString
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID }, // Instead of GraphQLString
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
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
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
