import { dateFormat } from "../utils/dateFormat";
import { formatWeather } from "../utils/formatWeather";

interface WeatherForecastService {
  latitude: number;
  longitude: number;
  startDate?: string;
  endDate?: string;
  days?: number;
}
export const weatherForecastDailyService = async (
  weatherArgs: WeatherForecastService
) => {
  const {
    latitude,
    longitude,
    startDate = "",
    endDate = "",
    days = 7,
  } = weatherArgs;
  const baseUrl = process.env.OPEN_METEO_WEATHER;
  if (!baseUrl) {
    throw new Error("Missing OPEN_METEO_WEATHER env variable");
  }
  if (!latitude) {
    throw new Error("latitue is required");
  }
  if (!longitude) {
    throw new Error("longitude is required");
  }
  const weatherCoordinatesParams = `latitude=${latitude}&longitude=${longitude}`;
  let weatherDateParams = "";
  if (startDate === "" && endDate === "") {
    weatherDateParams += `&forecast_days=${days}`;
  }

  if (startDate !== "") {
    weatherDateParams += `&startDate=${dateFormat(startDate)}`;
  }
  if (endDate === "") {
    if (startDate !== "") {
      const date = new Date(startDate);
      const getEndDate = new Date(date.setDate(date.getDate() + (7 - 1)));
      weatherDateParams += `&endDate=${dateFormat(getEndDate)}`;
    }
  } else {
    weatherDateParams += `&endDate=${dateFormat(endDate)}`;
  }

  const weatherDailyParams =
    "&daily=weather_code,snowfall_sum,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,uv_index_max,sunshine_duration,daylight_duration";
  const endPoint = await fetch(
    `${baseUrl}/v1/forecast?${weatherCoordinatesParams}${weatherDailyParams}${weatherDateParams}`
  );
  if (!endPoint.ok) {
    throw new Error("Error");
  }
  const results = await endPoint.json();
  const weatherForecast = formatWeather(results.daily_units, results.daily);

  return {
    daily: weatherForecast,
  };
};
