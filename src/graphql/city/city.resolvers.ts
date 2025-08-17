import { searchCities } from "./city.service";

export const cityResolvers = {
  Query: {
    citySuggestions: async (parent: unknown, args: { name: string }) => {
      const { name } = args;
      const cities = await searchCities(name);
      return cities.data;
    },
  },
};
