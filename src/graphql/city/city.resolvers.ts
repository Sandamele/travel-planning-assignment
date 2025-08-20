import { searchCities } from "../../services/city.service";

export const cityResolvers = {
  Query: {
    citySuggestions: async (_parent: unknown, args: { name: string }) => {
      const { name } = args;
      const cities = await searchCities(name);
      return cities.data;
    },
  },
};
