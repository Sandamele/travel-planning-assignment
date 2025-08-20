export const weatherTypeDefs = `#graphql
"""
Daily weather data for a specific location.
"""
type DailyWeather {
    """
    Date of the forecast in YYYY-MM-DD format.
    """
    time: String!

    """
    Weather code representing conditions (e.g., sunny, rainy, snow).
    """
    weather_code: String!
    snowfall_sum: String
    temperature_2m_max: String
    temperature_2m_min: String
    precipitation_sum: String
    wind_speed_10m_max: String
    uv_index_max: String
    sunshine_duration: String
    daylight_duration: String
}

"""
A recommended activity and its suitability score for a given day.
"""
type RankedActivity {
    """
    Name of the activity (e.g., Skiing, Surfing).
    """
    name: String!

    """
    Score representing suitability based on weather conditions.
    """
    score: Int!
}

"""
List of ranked activities for a specific day.
"""
type Activities {
    """
    Date for which activities are ranked.
    """
    time: String!

    """
    List of activities ranked by suitability score.
    """
    rankedActivities: [RankedActivity!]!
}

"""
Weather forecast and activity suggestions for a location.
"""
type Weather {
    latitude: Float!
    longitude: Float!
    daily: [DailyWeather!]!
    activities: [Activities!]!
}

type Query {
    """
    Get daily weather forecast and activity recommendations for a location.
    """
    weatherForecastDaily(
        latitude: Float!, 
        longitude: Float!, 
        startDate: String, 
        endDate: String, 
        days: Int
    ): Weather
}
`;
