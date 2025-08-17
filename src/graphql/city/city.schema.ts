export const cityTypeDefs = `#graphql
type City {
    id: ID!
    name: String!
    country: String
    latitude: Float!
    longitude: Float!
    province: String
}

type Query {
    citySuggestions(name: String!): [City!]!
}
`;
