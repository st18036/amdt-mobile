export type TrafficCongestion = {
id: string;
roadName: string;
severity: "LOW" | "MEDIUM" | "HIGH";
coord: { latitude: number; longitude: number };
};


export type AirQuality = {
id: string;
station: string;
pm25: number; // µg/m³
pm10: number;
coord: { latitude: number; longitude: number };
};


export type Weather = {
id: string;
temperatureC: number;
condition: "Clear" | "Cloudy" | "Rain";
coord: { latitude: number; longitude: number };
};