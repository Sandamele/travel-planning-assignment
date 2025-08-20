import { rankedActivitiesDailyService } from "../../services/rankedActivitiesDaily.service";
import { weatherForecastDailyService } from "../../services/weather.service";
import { formatWeatherWithUnits } from "../../utils/formatWeatherWithUnits";

export const weatherResolvers = {
  Query: {
    weatherForecastDaily: async (
      _parent: unknown,
      args: {
        latitude: number;
        longitude: number;
        startDate?: string;
        endDate?: string;
        days?: number;
      }
    ) => {
      const { latitude, longitude, startDate, endDate, days } = args;
      const weatherForecast = await weatherForecastDailyService({
        latitude,
        longitude,
        startDate,
        endDate,
        days,
      });
      const activities = rankedActivitiesDailyService(weatherForecast.daily);
      return {
        latitude,
        longitude,
        daily: formatWeatherWithUnits(weatherForecast.daily),
        activities,
      };
    },
  },
};
