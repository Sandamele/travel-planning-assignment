/**
 * Converts an array of weather forecasts into display-friendly strings.
 *
 * Each numeric field in the forecast is transformed from an object
 * of the form `{ value: number, unit: string | null }` into a
 * human-readable string like `"16.5 °C"`. The `time` field remains
 * unchanged as an ISO date string.
 *
 * @param forecasts - Array of forecast objects, each containing fields with `{ value, unit }` or `time` as a string.
 * @returns Array of forecast objects with all numeric fields converted into display strings for easy UI rendering.
 *
 * @example
 * const displayForecasts = formatWeatherWithUnits(formattedForecasts);
 * // [
 * //   { time: "2025-08-17", temperature_2m_max: "16.5 °C", precipitation_sum: "0 mm", ... },
 * //   { time: "2025-08-18", temperature_2m_max: "15 °C", precipitation_sum: "2.1 mm", ... },
 * // ]
 */
export const formatWeatherWithUnits = (
  forecasts: Record<string, any>[]
): Record<string, string>[] => {
  return forecasts.map((forecast) => {
    const displayForecast: Record<string, string> = {};

    for (const [field, value] of Object.entries(forecast)) {
      if (field === "time") {
        displayForecast[field] = value as string;
      } else if (typeof value === "object" && value !== null) {
        const { value: raw, unit } = value;
        displayForecast[field] = unit ? `${raw} ${unit}` : String(raw);
      } else {
        displayForecast[field] = String(value);
      }
    }

    return displayForecast;
  });
};
