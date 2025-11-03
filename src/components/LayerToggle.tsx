import React, { useState } from "react";
import { View, Switch, Text } from "react-native";


type Props = { label: string; value: boolean; onChange: (v:boolean)=>void };
export default function LayerToggle({label, value, onChange}:Props){
return (
<View style={{ flexDirection:"row", alignItems:"center", paddingVertical:8 }}>
<Switch value={value} onValueChange={onChange} />
<Text style={{ marginLeft:8 }}>{label}</Text>
</View>
);
}
