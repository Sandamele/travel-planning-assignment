# User Case
When a user starts typing a city name in the app, the API should return a list of suggested cities.
Once the user selects a city, the app should display the weather for that city and recommend activities based on the 
current forecast.

# How the API Works
## Dynamic City Suggestions
1. The API receives partial or complete input from the user.
2. It queries Open-Meteo (or a local city database) for cities that match the input.
3. The API returns the matching cities as a list of suggestions.

## Weather Forecasts for a Selected City
1. The API receives the selected city.
2. It calls the Open-Meteo API to get the weather forecast.
3. It evaluates the weather to determine which activities are most suitable.
4. The API returns the weather forecast along with a ranked list of recommended activities.

## API links 
#### search for city name
https://geocoding-api.open-meteo.com/v1/search?name=durban

#### weather forecast
https://api.open-meteo.com/v1/forecast?latitude=-29.8587&longitude=31.0218