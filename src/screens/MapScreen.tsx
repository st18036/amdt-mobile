import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { useMobilityVM } from "@/viewmodels/useMobilityVM";
import CityMap from "@/components/CityMap";


export default function MapScreen(){
const { traffic, aq, loading, error, refresh } = useMobilityVM();
const [showTraffic, setShowTraffic] = useState(true);
const [showAQ, setShowAQ] = useState(true);


return (
<View style={{ flex:1 }}>
{error ? <Text style={{ padding:8, color:"red" }}>{error}</Text> : null}
<CityMap traffic={showTraffic ? traffic : []} aq={showAQ ? aq : []} />
<View style={{ flexDirection:"row", padding:8, justifyContent:"space-around" }}>
<Button title={loading?"Refreshing...":"Refresh"} onPress={refresh} />
<Button title={showTraffic?"Hide Traffic":"Show Traffic"} onPress={()=>setShowTraffic(v=>!v)} />
<Button title={showAQ?"Hide Air Quality":"Show Air Quality"} onPress={()=>setShowAQ(v=>!v)} />
</View>
</View>
);
}