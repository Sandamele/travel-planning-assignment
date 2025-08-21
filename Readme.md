# Travel Planning API

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

### Architecture Overview

<img width="959" height="807" alt="Screenshot 2025-08-15 at 19 11 36" src="https://github.com/user-attachments/assets/f9ecd5e9-944d-4345-85ef-252eff33f287" />

## Technical Choices

- Nodejs 22+
- Typescript: Strong typing improves maintainability
- Graphql
- Apollo Server: Easy to understand and use; integrates seamlessly with Node.js
- Pnpm: Efficient package management compared to npm
- Jest: For unit testing

## Installation

Clone the repo

```bash
    git clone https://github.com/Sandamele/travel-planning-assignment
    cd ./travel-planning-assignment
    touch .env # add the required envs. you find the required keys in .env.example

    # run in dev
    pnpm dev

    # run in production
    pnpm build
    pnpm start
```

## Project Structure

```bash
travel-planning-assignment/
├── node_modules/
├── src/
│   ├── __tests__/                    # Test files
│   │   ├── graphql/                  # GraphQL related tests
│   │   ├── city/
│   │   │   └── searchCities.test.ts  # City search functionality tests
│   │   └── weather/
│   │       └── weatherForecastDailyService.test.ts  # Weather service tests
│   ├── graphql/                      # GraphQL schema and resolvers
│   │   ├── city/
│   │   │   └── city.resolvers.ts     # City-related GraphQL resolvers
│   │   ├── weather/
│   │   │   └── weather.resolvers.ts  # Weather-related GraphQL resolvers
│   │   ├── city.schema.ts            # City GraphQL schema definitions
│   │   ├── weather.schema.ts         # Weather GraphQL schema definitions
│   │   └── index.ts                  # GraphQL module entry point
│   ├── services/                     # Business logic services
│   │   ├── city.service.ts           # City data service
│   │   ├── rankedActivitiesDaily.service.ts  # Activity ranking service
│   │   └── weather.service.ts        # Weather data service
│   ├── utils/                        # Utility functions
│   │   ├── activityRanking.ts        # Activity ranking algorithms
│   │   ├── dateFormat.ts             # Date formatting utilities
│   │   ├── formatWeather.ts          # Weather data formatting
│   │   ├── formatWeatherWithUnits.ts # Weather data with unit formatting
│   │   └── index.ts                  # Utilities module entry point
│   └── index.ts                      # Application entry point
├── env/                              # Environment configurations
├── env.example                       # Environment variables template
├── .gitignore                        # Git ignore rules
├── jest.config.js                    # Jest testing configuration
├── package.json                      # Project dependencies and scripts
├── pnpm-lock.yaml                    # Pnpm lock file
├── Readme.md                         # Project documentation
└── tsconfig.json                     # TypeScript configuration
```

## Omissions & Trade-off

- Caching: Weather and city API responses are not cached; will result in repeated calls for the same queries. Trade-off made to keep to not build complex solution simple.
- Activity Ranking Disclaimer: The ranking system is not perfect because the API does not have information about whether a city actually supports a given activity. For example, it cannot verify if a city has beaches suitable for surfing or ski resorts for skiing. The activity scores should therefore be used only as a general indication based on weather conditions, not a guarantee that the activity is available.
- Error Handling: Basic error handling implemented, but more robust retry strategies and API failure recovery were skipped.

## Future Improvements

- Caching: Implement a caching system like Redis to store frequently queried city and weather data, reducing API calls and improving response times.
- Expanded Activity Scoring System: Enhance the scoring algorithm to include additional weather parameters such as wind speed, precipitation probability, UV index, or water temperature. Also, validate whether the city actually supports the activity (e.g., beaches for surfing, ski resorts for skiing).
- Rate Limiting: Add rate limiting to prevent abuse and ensure the API remains responsive under high traffic.

Use of AI tools: ChatGPT was used to assist with writing some documentation and JSDocs.
