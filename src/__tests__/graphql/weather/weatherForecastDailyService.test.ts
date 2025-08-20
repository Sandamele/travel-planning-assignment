import { weatherForecastDailyService } from "../../../services/weather.service";
import { formatWeather } from "../../../utils/formatWeather";

jest.mock("../../../utils/formatWeather");

const mockFormatWeather = formatWeather as jest.MockedFunction<typeof formatWeather>;
const globalFetchMock = jest.fn();
global.fetch = globalFetchMock as any;

describe("weatherForecastDailyService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.OPEN_METEO_WEATHER = "https://api.open-meteo.com";
  });

  it("throws error if OPEN_METEO_WEATHER is missing", async () => {
    delete process.env.OPEN_METEO_WEATHER;
    await expect(weatherForecastDailyService({ latitude: 0, longitude: 0 }))
      .rejects.toThrow("Missing OPEN_METEO_WEATHER env variable");
  });


  it("fetches and formats weather correctly", async () => {
    const mockApiResponse = { daily_units: {}, daily: {} };
    globalFetchMock.mockResolvedValueOnce({ ok: true, json: async () => mockApiResponse } as any);
    mockFormatWeather.mockReturnValueOnce([{ time: "2025-08-19" }]);

    const result = await weatherForecastDailyService({ latitude: -26.2, longitude: 28.0, days: 3 });

    expect(globalFetchMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ daily: [{ time: "2025-08-19" }] });
  });

  it("handles startDate and endDate parameters", async () => {
    const mockApiResponse = { daily_units: {}, daily: {} };
    globalFetchMock.mockResolvedValueOnce({ ok: true, json: async () => mockApiResponse } as any);
    mockFormatWeather.mockReturnValueOnce([{ time: "2025-08-20" }]);

    const result = await weatherForecastDailyService({
      latitude: -26.2,
      longitude: 28.0,
      startDate: "2025-08-20",
      endDate: "2025-08-21",
    });

    expect(globalFetchMock).toHaveBeenCalled();
    expect(result.daily[0].time).toBe("2025-08-20");
  });
});
