import { useEffect, useState, useCallback } from "react";
import { fetchTraffic } from "@/services/atService";
import { fetchAirQuality, fetchWeather } from "@/services/niwaService";
import { AirQuality, TrafficCongestion, Weather } from "@/types/domain";


export function useMobilityVM() {
const [traffic, setTraffic] = useState<TrafficCongestion[]>([]);
const [aq, setAq] = useState<AirQuality[]>([]);
const [weather, setWeather] = useState<Weather[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


const refresh = useCallback(async () => {
setLoading(true); setError(null);
try {
const [t, a, w] = await Promise.all([fetchTraffic(), fetchAirQuality(), fetchWeather()]);
setTraffic(t); setAq(a); setWeather(w);
} catch (e: any) {
setError(e?.message ?? "Failed to refresh data");
} finally {
setLoading(false);
}
}, []);


useEffect(() => { refresh(); }, [refresh]);


return { traffic, aq, weather, loading, error, refresh };
}