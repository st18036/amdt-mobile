import React, { useState } from "react";
import { View, Text } from "react-native";
import LayerToggle from "@/components/LayerToggle";


export default function LayersScreen(){
const [traffic, setTraffic] = useState(true);
const [aq, setAq] = useState(true);
const [weather, setWeather] = useState(false);


return (
<View style={{ flex:1, padding:16 }}>
<Text style={{ fontSize:20, marginBottom:8 }}>Layers</Text>
<LayerToggle label="Traffic" value={traffic} onChange={setTraffic} />
<LayerToggle label="Air Quality" value={aq} onChange={setAq} />
<LayerToggle label="Weather" value={weather} onChange={setWeather} />
<Text style={{ marginTop:12, color:"#666" }}>Layer switches shown here; state can be shared with Map via context if preferred.</Text>
</View>
);
}