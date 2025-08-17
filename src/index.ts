import {ApolloServer} from "@apollo/server";
import {typeDefs, resolvers} from "./graphql";
import {startStandaloneServer} from "@apollo/server/standalone";
import dotenv from "dotenv";
dotenv.config();
const PORT: number = parseInt(process.env.PORT ?? "1338", 10);
const server = new ApolloServer({typeDefs, resolvers});
const startApolloServer = async () => {
    const {url} = await startStandaloneServer(server, {listen: {port: PORT}})
    console.log("Starting Apollo server...")
    console.log(`url: ${url}`);
}

startApolloServer();