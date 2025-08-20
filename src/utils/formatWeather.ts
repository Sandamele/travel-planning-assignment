/**
 * Formats Open-Meteo daily forecast data into an array of objects.
 * Each field returns both the raw numeric value and its unit (if available).
 *
 * @param units - Units metadata from the API (daily_units)
 * @param data - Daily forecast data from the API (daily)
 * @returns Array of formatted daily forecasts
 */
export const formatWeather = (
  units: Record<string, string>,
  data: Record<string, any[]>
) => {
  const totalDays = data.time?.length;

  return Array.from({ length: totalDays }, (_, dayIndex) => {
    const dayForecast: Record<string, any> = {};

    for (const field of Object.keys(data)) {
      const value = data[field][dayIndex];
      const unit = units[field];

      if (field === "time") {
        dayForecast[field] = value; 
      } else {
        dayForecast[field] = { value, unit: unit || null };
      }
    }
    
    return dayForecast;
  });
};
