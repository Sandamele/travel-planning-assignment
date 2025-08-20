interface Weather {
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
}

type TempRange = [number, number];

interface ActivityCondition {
  weatherCodes: number[];
  tempMax: TempRange;
  tempMin: TempRange;
}

type Activity = keyof typeof activityConditions;

interface ActivityWeights {
  weather: number;
  tempMax: number;
  tempMin: number;
}

interface RankedActivity {
  name: string;
  score: number;
}

// Mapping of activities to their preferred weather conditions.
// `weatherCodes` use Open-Meteo codes — see issue for descriptions:
// https://github.com/open-meteo/open-meteo/issues/287
const activityConditions: Record<string, ActivityCondition> = {
  skiing: {
    weatherCodes: [71, 73, 75, 77, 85, 86],
    tempMax: [0, 5],
    tempMin: [-5, 0],
  },
  surfing: {
    weatherCodes: [0, 1, 2, 3, 45, 48, 49, 50, 51],
    tempMax: [18, 28],
    tempMin: [15, 25],
  },
  indoorSightseeing: {
    weatherCodes: [
      51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99,
    ],
    tempMax: [-10, 18],
    tempMin: [-10, 10],
  },
  outdoorSightseeing: {
    weatherCodes: [0, 1, 2, 3],
    tempMax: [18, 28],
    tempMin: [10, 30],
  },
};

/** Weights assigned to each factor for scoring activities */
const weights: Record<Activity, ActivityWeights> = {
  skiing: { weather: 60, tempMax: 20, tempMin: 20 },
  surfing: { weather: 40, tempMax: 35, tempMin: 35 },
  indoorSightseeing: { weather: 60, tempMax: 25, tempMin: 15 },
  outdoorSightseeing: { weather: 45, tempMax: 35, tempMin: 20 },
};

/**
 * Scores a value if it falls within a given range.
 *
 * @param {number} value - The value to score.
 * @param {TempRange | number[]} range - Allowed range or array of values.
 * @param {number} maxScore - Maximum score if the value matches.
 * @returns {number} Score for the value (maxScore or 0).
 */
const scoreIfInRange = (
  value: number,
  range: TempRange | number[],
  maxScore: number
): number => {
  if (
    Array.isArray(range) &&
    range.length === 2 &&
    typeof range[0] === "number"
  ) {
    return value >= range[0] && value <= range[1] ? maxScore : 0;
  } else {
    return (range as number[]).includes(value) ? maxScore : 0;
  }
};

/**
 * Calculates the total score of an activity given weather conditions.
 *
 * @param {Weather} weather - The weather data.
 * @param {Activity} activity - Activity to score.
 * @returns {number} Total activity score.
 */
/**
 * Calculates the total score of an activity given weather conditions.
 *
 * @param {Weather} weather - The weather data.
 * @param {Activity} activityName - Activity to score.
 * @returns {number} Total activity score.
 */
const scoreActivity = (weather: Weather, activityName: Activity): number => {
  const { weatherCode, temperatureMax, temperatureMin } = weather;
  const {
    weatherCodes,
    tempMax: allowedMaxTemp,
    tempMin: allowedMinTemp,
  } = activityConditions[activityName];
  const {
    weather: weatherWeight,
    tempMax: maxTempWeight,
    tempMin: minTempWeight,
  } = weights[activityName];

  return (
    scoreIfInRange(weatherCode, weatherCodes, weatherWeight) +
    scoreIfInRange(temperatureMax, allowedMaxTemp, maxTempWeight) +
    scoreIfInRange(temperatureMin, allowedMinTemp, minTempWeight)
  );
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Returns ranked activities based on weather conditions.
 *
 * @param {Weather} weather - Weather data to evaluate activities.
 * @returns {RankedActivity[]} Array of activities sorted by score (highest first).
 */
export const getRankedActivities = (weather: Weather): RankedActivity[] => {
  return (Object.keys(activityConditions) as Activity[])
    .map((activity) => ({
      name: capitalize(activity),
      score: scoreActivity(weather, activity),
    }))
    .sort(
      (currentActivity, nextActivity) =>
        nextActivity.score - currentActivity.score
    );
};
