// simulated NIWA
import { AirQuality, Weather } from "@/types/domain";

/**
 * Simulate fetching air quality data from NIWA
 * Returns array of AirQuality stations across Auckland
 */
export async function fetchAirQuality(): Promise<AirQuality[]> {
  await delay(700 + Math.random() * 700);

  return [
    {
      id: "aq1",
      station: "Queen St",
      pm25: rnd(5, 35),
      pm10: rnd(10, 60),
      coord: { latitude: -36.8485, longitude: 174.7633 },
      updatedAt: new Date().toISOString(), // ✅ added timestamp
    },
    {
      id: "aq2",
      station: "Newmarket",
      pm25: rnd(5, 35),
      pm10: rnd(10, 60),
      coord: { latitude: -36.87, longitude: 174.777 },
      updatedAt: new Date().toISOString(),
    },
    {
      id: "aq3",
      station: "Mt Albert",
      pm25: rnd(5, 35),
      pm10: rnd(10, 60),
      coord: { latitude: -36.887, longitude: 174.713 },
      updatedAt: new Date().toISOString(),
    },
  ];
}

/**
 * Simulate fetching NIWA weather data
 */
export async function fetchWeather(): Promise<Weather[]> {
  await delay(500 + Math.random() * 500);

  return [
    {
      id: "w1",
      temperatureC: rnd(12, 25),
      condition: pick(["Clear", "Cloudy", "Rain", "Windy", "Showers"]) as any,
      coord: { latitude: -36.85, longitude: 174.78 },
      updatedAt: new Date().toISOString(), // ✅ added timestamp
    },
    {
      id: "w2",
      temperatureC: rnd(10, 22),
      condition: pick(["Clear", "Overcast", "Rain"]) as any,
      coord: { latitude: -36.9, longitude: 174.75 },
      updatedAt: new Date().toISOString(),
    },
  ];
}

/* Utility functions */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const rnd = (min: number, max: number) =>
  Math.round((min + Math.random() * (max - min)) * 10) / 10;
