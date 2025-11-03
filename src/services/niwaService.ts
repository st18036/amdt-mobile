// simulated NIWA
import { AirQuality, Weather } from "@/types/domain";


export async function fetchAirQuality(): Promise<AirQuality[]> {
await delay(700 + Math.random()*700);
return [
{ id: "aq1", station: "Queen St", pm25: rnd(5,35), pm10: rnd(10,60), coord: { latitude:-36.8485, longitude:174.7633 }},
{ id: "aq2", station: "Newmarket", pm25: rnd(5,35), pm10: rnd(10,60), coord: { latitude:-36.8700, longitude:174.7770 }},
];
}


export async function fetchWeather(): Promise<Weather[]> {
await delay(500 + Math.random()*500);
return [
{ id: "w1", temperatureC: rnd(12,25), condition: pick(["Clear","Cloudy","Rain"]) as any, coord: { latitude:-36.85, longitude:174.78 } }
];
}


const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
const pick = (arr: string[]) => arr[Math.floor(Math.random()*arr.length)];
const rnd = (min:number,max:number)=> Math.round((min + Math.random()*(max-min))*10)/10;