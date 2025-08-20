/**
 * Generates ranked activities for each day based on weather data.
 *
 * @param {Record<string, any>[]} dailyWeatherData - Array of daily weather forecasts.
 *   Each forecast should have:
 *     - weather_code.value: number representing the weather condition
 *     - temperature_2m_max.value: number representing max temperature
 *     - temperature_2m_min.value: number representing min temperature
 *     - time: string or date representing the day
 *
 * @returns {Array<{ date: string, activitiesRanking: any }>} Array of objects,
 *   each containing the date and the ranked activities for that day.
 */

import { getRankedActivities } from "../utils/activityRanking";

export const rankedActivitiesDailyService = (
  weatherForecastData: Record<string, any>[]
) => {
  const dailyRankings = [];
  for (let weatherForecast of weatherForecastData) {
    const weatherCode = weatherForecast.weather_code.value;
    const temperatureMax = weatherForecast.temperature_2m_max.value;
    const temperatureMin = weatherForecast.temperature_2m_min.value;
    const rankedActivities = getRankedActivities({
      weatherCode,
      temperatureMax,
      temperatureMin,
    });
    dailyRankings.push({ time: weatherForecast.time, rankedActivities });
  }
  return dailyRankings;
};
