import { gql } from 'apollo-server-express'
import db from '../database'

export const typeDefs = gql`
    extend type Query {
        tickets: [Ticket]
        ticket(id: ID!): Ticket
    }

    type Ticket {
        id: ID!
        subject: String
        user_id: Int
        user: User
        assigned_to_user_id: Int
        assigned_to_user: User
    }
    
    extend type Mutation {
        addTicket(user_id: Int!): Ticket
    }
`

export const resolvers = {
    Query: {
        tickets: async () => db.tickets.findAll(),
        ticket: async (obj, args, context, info) =>
            db.tickets.findByPk(args.id),
    },
    Ticket: {
        user: async (obj, args, context, info) =>
            db.users.findByPk(obj.user_id),
        assigned_to_user: async (obj, args, context, info) =>
            db.users.findByPk(obj.assigned_to_user_id),
    },
    Mutation: {
        addTicket: async(_, { user_id }) =>
            db.tickets.create({ assigned_to_user_id: user_id })
    }
}
