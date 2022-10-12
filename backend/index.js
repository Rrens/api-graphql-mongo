const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
ApolloServerPluginLandingPageGraphQLPlayground;

// connection to mongodb
mongoose.connect("mongodb://localhost:27017/graphql-mongo", {
  useNewUrlParser: true,
  // useFindAndModify: true,
  useUnifiedTopology: true,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
