import glob from "glob";
import path from "path";
import Sequelize from "sequelize";

const express = require('express');
const bodyParser = require('body-parser')
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const server = new ApolloServer({
    modules: [
        require('./models/users'),
        require('./models/tickets')
    ]
})

server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
