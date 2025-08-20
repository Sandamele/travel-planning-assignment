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

<img width="959" height="807" alt="Screenshot 2025-08-15 at 19 11 36" src="https://github.com/user-attachments/assets/f9ecd5e9-944d-4345-85ef-252eff33f287" />

## Pre-requisite
- Nodejs 22+
- Pnpm

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
