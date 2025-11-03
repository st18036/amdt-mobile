import React from "react";
import { View, Button } from "react-native";
import { useAuthVM } from "@/viewmodels/useAuthVM";


export default function SettingsScreen(){
const { logout } = useAuthVM();
return (
<View style={{ flex:1, padding:16 }}>
<Button title="Sign out" onPress={logout} />
</View>
);
}