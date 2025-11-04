// simulated AT
import { TrafficCongestion } from "@/types/domain";


export async function fetchTraffic(): Promise<TrafficCongestion[]> {
  await delay(800 + Math.random() * 800);
  return [
    {
      id: "1",
      roadName: "SH1 - Grafton",
      severity: pick(["LOW", "MEDIUM", "HIGH"]) as any,
      coord: { latitude: -36.8607, longitude: 174.77 },
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      roadName: "Dominion Rd",
      severity: pick(["LOW", "MEDIUM", "HIGH"]) as any,
      coord: { latitude: -36.877, longitude: 174.745 },
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      roadName: "Northwestern MW",
      severity: pick(["LOW", "MEDIUM", "HIGH"]) as any,
      coord: { latitude: -36.8708, longitude: 174.705 },
      updatedAt: new Date().toISOString(),
    },
  ];
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
const pick = (arr: string[]) => arr[Math.floor(Math.random()*arr.length)];