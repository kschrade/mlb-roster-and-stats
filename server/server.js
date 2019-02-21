const { ApolloServer } = require('apollo-server');

const MLBDataSource = require('./datasources/MLBSource');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        mlbAPI: new MLBDataSource(),
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
