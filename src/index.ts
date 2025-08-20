import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { typeDefs, resolvers } from "./graphql";
dotenv.config();

const PORT: number = parseInt(process.env.PORT ?? "1338", 10);
interface MyContext {
  weatherCache: Record<string, any>;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async () => {
      return { weatherCache: {} };
    },
  });

  console.log("Starting Apollo server...");
  console.log(`url: ${url}`);
};

startApolloServer();
