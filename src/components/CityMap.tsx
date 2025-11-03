import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View } from "react-native";
import { AirQuality, TrafficCongestion } from "@/types/domain";


export default function CityMap({
traffic, aq,
}: { traffic: TrafficCongestion[]; aq: AirQuality[]; }) {
const region = { latitude: -36.8485, longitude: 174.7633, latitudeDelta: 0.08, longitudeDelta: 0.08 };
return (
<View style={{ flex:1 }}>
<MapView provider={PROVIDER_GOOGLE} style={{ flex:1 }} initialRegion={region}>
{traffic.map(t => (
<Marker key={t.id} coordinate={t.coord} title={t.roadName} description={`Congestion: ${t.severity}`} />
))}
{aq.map(a => (
<Marker key={a.id} coordinate={a.coord} title={`AQ ${a.station}`} description={`PM2.5 ${a.pm25} / PM10 ${a.pm10}`} />
))}
</MapView>
</View>
);
}