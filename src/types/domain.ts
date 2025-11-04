// src/types/domain.ts

export interface Coord {
  latitude: number;
  longitude: number;
}

/** 🚗 Traffic congestion data model */
export interface TrafficCongestion {
  id: string;
  roadName: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  coord: Coord;
  updatedAt: string; // ✅ added
}

/** 🌫 Air quality data model */
export interface AirQuality {
  id: string;
  station: string;
  pm25: number;
  pm10: number;
  coord: Coord;
  updatedAt: string; // ✅ added
}

/** 🌦 Weather data model */
export interface Weather {
  id: string;
  temperatureC: number;
  condition: "Clear" | "Cloudy" | "Rain" | "Windy" | "Showers" | "Overcast";
  coord: Coord;
  updatedAt: string; // ✅ added
}