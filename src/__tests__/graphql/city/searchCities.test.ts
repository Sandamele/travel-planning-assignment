import { searchCities } from "../../../graphql/city/city.service";
// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch as jest.Mock;

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
  mockFetch.mockReset();
});

afterAll(() => {
  process.env = originalEnv;
});

describe("searchCities", () => {
  const mockApiResponse = (results: any, status = 200) => {
    mockFetch.mockResolvedValueOnce({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve({ results }),
    });
  };

  const sampleCity = {
    id: "123",
    name: "Test City",
    latitude: 12.34,
    longitude: 56.78,
    country: "Test Country",
    admin1: "Test Province",
  };

  it("should return mapped cities on successful API call", async () => {
    process.env.OPEN_METEO_CITIES = "https://api.example.com";
    mockApiResponse([sampleCity]);

    const result = await searchCities("test");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/v1/search?name=test"
    );
    expect(result.data).toEqual([
      {
        id: "123",
        name: "Test City",
        latitude: 12.34,
        longitude: 56.78,
        country: "Test Country",
        province: "Test Province",
      },
    ]);
  });

  it("should handle missing admin1 field", async () => {
    process.env.OPEN_METEO_CITIES = "https://api.example.com";
    const cityWithoutAdmin = { ...sampleCity, admin1: undefined };
    mockApiResponse([cityWithoutAdmin]);

    const result = await searchCities("test");

    expect(result.data[0].province).toBe("");
  });

  it("should throw error when OPEN_METEO_CITIES is missing", async () => {
    delete process.env.OPEN_METEO_CITIES;

    await expect(searchCities("test")).rejects.toThrow(
      "Missing OPEN_METEO_CITIES env variable"
    );
  });

  it("should throw error on API failure status", async () => {
    process.env.OPEN_METEO_CITIES = "https://api.example.com";
    mockApiResponse([], 500);

    await expect(searchCities("test")).rejects.toThrow(
      "API request failed with status 500"
    );
  });

  it("should handle empty results", async () => {
    process.env.OPEN_METEO_CITIES = "https://api.example.com";
    mockApiResponse([]);

    const result = await searchCities("unknown");

    expect(result.data).toEqual([]);
  });
});
