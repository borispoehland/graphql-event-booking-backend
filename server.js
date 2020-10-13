const express = require('express');
const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

const server = new ApolloServer({
    typeDefs, resolvers,
    context: ({req}) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return {isAuth: false};
        }
        const token = authHeader.replace('Bearer ', '');
        if (!token || token === '') {
            return {isAuth: false};
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return {isAuth: false};
        }
        if (!decodedToken) {
            return {isAuth: false};
        }
        return {isAuth: true, userId: decodedToken.userId};
    },
});
server.applyMiddleware({app});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@graphqlbackend.jxhfs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => {
        app.listen(process.env.PORT || 3000);
    })
    .catch((err) => {
        throw err;
    });
