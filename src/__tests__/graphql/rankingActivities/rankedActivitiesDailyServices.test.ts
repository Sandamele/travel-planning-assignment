import { rankedActivitiesDailyService } from "../../../services/rankedActivitiesDaily.service";
import { getRankedActivities } from "../../../utils/activityRanking";

jest.mock("../../../utils/activityRanking", () => ({
  getRankedActivities: jest.fn(),
}));

describe("rankedActivitiesDailyService", () => {
  const mockWeatherData = [
    {
      time: "2025-08-21",
      weather_code: { value: 2 },
      temperature_2m_max: { value: 22 },
      temperature_2m_min: { value: 15 },
    },
    {
      time: "2025-08-22",
      weather_code: { value: 75 },
      temperature_2m_max: { value: 3 },
      temperature_2m_min: { value: -2 },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return daily rankings with correct structure", () => {
    (getRankedActivities as jest.Mock).mockImplementation(({ weatherCode }) => {
      if (weatherCode === 2) return { outdoorSightseeing: 100, skiing: 0 };
      if (weatherCode === 75) return { outdoorSightseeing: 0, skiing: 100 };
    });

    const result = rankedActivitiesDailyService(mockWeatherData);

    expect(result).toEqual([
      {
        time: "2025-08-21",
        rankedActivities: { outdoorSightseeing: 100, skiing: 0 },
      },
      {
        time: "2025-08-22",
        rankedActivities: { outdoorSightseeing: 0, skiing: 100 },
      },
    ]);

    expect(getRankedActivities).toHaveBeenCalledTimes(mockWeatherData.length);
  });

  it("should pass correct parameters to getRankedActivities", () => {
    rankedActivitiesDailyService(mockWeatherData);

    expect(getRankedActivities).toHaveBeenCalledWith({
      weatherCode: 2,
      temperatureMax: 22,
      temperatureMin: 15,
    });
    expect(getRankedActivities).toHaveBeenCalledWith({
      weatherCode: 75,
      temperatureMax: 3,
      temperatureMin: -2,
    });
  });
});
