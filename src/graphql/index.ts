import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
// types imports
import { cityTypeDefs } from "./city/city.schema";
import { weatherTypeDefs } from "./weather/weather.schema";

// resolver imports
import { cityResolvers } from "./city/city.resolvers";
import { weatherResolvers } from "./weather/weather.resolvers";

export const typeDefs = mergeTypeDefs([cityTypeDefs, weatherTypeDefs]);
export const resolvers = mergeResolvers([cityResolvers, weatherResolvers]);
