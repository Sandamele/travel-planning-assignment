import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
// types imports
import { cityTypeDefs } from "./city/city.schema";

// resolver imports
import { cityResolvers } from "./city/city.resolvers";

export const typeDefs = mergeTypeDefs([cityTypeDefs]);
export const resolvers = mergeResolvers([cityResolvers]);
