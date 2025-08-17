export const weatherTypeDefs = `#graphql
    type DailyWeather {
        day: String, 
        snowfall_sum: String, 
        temperature_2m_max: String, 
        precipitation_sum: String,
        wind_speed_10m_max: String,
        uv_index_max: String,
        sunshine_duration: String,
        daylight_duration: String,
    }
    type Weather {
        latitude: Float!
        longitude: Float!
        daily: [DailyWeather]
    }
    
    type Query {
        weather(latitude: Float!, longitude: Float!, startDate: String, endDate: String, days: Int): Weather
    }
`;
