export const cityTypeDefs = `#graphql
"""
Represents a city with its location and administrative info.
"""
type City {
    """
    Unique identifier of the city.
    """
    id: ID!

    """
    Name of the city.
    """
    name: String!

    """
    Country where the city is located.
    """
    country: String

    """
    Latitude coordinate of the city.
    """
    latitude: Float!

    """
    Longitude coordinate of the city.
    """
    longitude: Float!

    """
    Province of the city.
    """
    province: String
}

type Query {
    """
    Returns a list of city suggestions that match the given name.
    - name: Partial or full name of the city to search for.
    """
    citySuggestions(name: String!): [City!]!
}
`;
