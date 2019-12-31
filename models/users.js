import { gql } from 'apollo-server-express'
import db from '../database'

export const typeDefs = gql`
    extend type Query {
        users: [User]
        user(id: ID!): User
    }

    type User {
        id: ID!
        email: String
        name: String
        tickets: [Ticket]
    }
    
    input UserInput {
        name: String
        email: String
    }
    
    extend type Mutation {
        addUser(name: String!, email: String!): User
    }
`

export const resolvers = {
    Query: {
        users: async () => db.users.findAll(),
        user: async (obj, args, context, info) => db.users.findByPk(args.id)
    },
    User: {
        tickets: async (obj, args, context, info) =>
            db.tickets.findAll({where: {user_id: obj.id}}),
    },
    Mutation: {
        addUser: async (_, { name, email }) =>
            db.users.create({ name: name, email: email })
    }
};
