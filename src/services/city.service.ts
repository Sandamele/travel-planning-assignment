interface Payload {
  results: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }[];
}
interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  province: string;
}

/**
 * Searches for cities matching the provided query using the Open-Meteo Geocoding API.
 *
 * @param query - The city name or partial name to search for.
 * @returns A promise that resolves to an object containing an array of cities.
 *
 * @throws Will throw an error if:
 *   - The `OPEN_METEO_CITIES` environment variable is missing.
 *   - The API request fails or returns a non-2xx status.
 *
 * @example
 * ```ts
 * try {
 *   const { data } = await searchCities("Cape Town");
 *   console.log(data);
 * } catch (error) {
 *   console.error("Failed to search cities:", error);
 * }
 * ```
 */
export const searchCities = async (
  query: string
): Promise<{ data: City[] }> => {
  const baseUrl = process.env.OPEN_METEO_CITIES;
  if (!baseUrl) {
    throw new Error("Missing OPEN_METEO_CITIES env variable");
  }

  const endpoint = `${baseUrl}/v1/search?name=${encodeURIComponent(query)}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const payload: Payload = await response.json();
  const data = payload.results.map((city) => ({
    id: city.id,
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    country: city.country,
    province: city.admin1 || "",
  }));
  return { data };
};
