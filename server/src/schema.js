// src/schema.js
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { find, filter } from 'lodash';

import Db from './db';

const typeDefs = `
  type Author {
    id: ID!
    firstName: String
    lastName: String
    email: String
    image: String
    posts: [Post] # the list of Posts by this author
    pictures: [Picture] # the list of Pictures by this author
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  type Picture {
    id: Int!
    title: String
    author: Author
    url: String
    published: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
    authors:[Author]
    pictures: [Picture]
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
    addAuthor(
      firstName: String!
      lastName: String!
      email: String
      image: String
    ): Author
    updateAuthor(
      authorId: Int!
      firstName: String
      lastName: String
      image: String
    ): Author
    deleteAuthor(
      authorId: Int!
    ): Author
  }
`;

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

// return count for increment
let nextId = Db.models.person.count().then(function(count){
  // count is an integer
  //console.log(count+1);
  return count+1;
});


const resolvers = {
  
  Query: {
    posts: () => posts,
    authors:() => Db.models.person.findAll(),
    author: (_, { id }) => Db.models.person.findById(id),
    pictures:() => Db.models.picture.findAll(),
  },

  Mutation: {
    
    addAuthor: async (root, args, context, info) => {
      const res = await Db.models.person.create(args);
      const newAuthor = { id: nextId, posts: [], pictures: [], firstName: args.firstName, lastName: args.lastName, image: args.image, email: args.email};
      authors.push(newAuthor);
      return newAuthor;
    },

    updateAuthor: (_, { authorId, firstName, lastName }) => {
      //const author = find(authors, { id: authorId});
      const author = Db.models.person.findById(authorId);
      if (!author) {
        throw new Error(`Couldn t find author with id ${authorId}`);
      }
      Db.models.person.update(
        {firstName:firstName,lastName:lastName},
        {where:{id:authorId}})
        .then(function (result) {
          /*Db.models.person.findById(peopleInfo.scenario.id)
          .then(function(user){
            response(user).code(200);
          }).catch(function (err) {
              request.server.log(['error'], err.stack);
            ).code(200);
          });*/
        }).catch(function (err) {
       /* request.server.log(['error'], err.stack);
       ).code(200);*/
      });
      author.firstName = firstName; 
      author.lastName = lastName;
      return author;
    },
    deleteAuthor: (_, { authorId }) => {
      //const author = find(authors, { id: authorId});
      const author = Db.models.person.findById(authorId);
      if (!author) {
        throw new Error(`Couldn t find author with id ${authorId}`);
      }
      return author;

    },
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
    pictures: (author) => Db.models.picture.findAll({
      where:{personId:author.id}
    }),
  },
  Post: {
    author:(post) => Db.models.person.findById(post.authorId)
  },
  Picture: {
    author: (picture) => Db.models.person.findById(picture.personId),
  }
};

const Sschema = makeExecutableSchema({typeDefs,resolvers});

export default Sschema;
