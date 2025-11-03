import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/LoginScreen";
import MapScreen from "@/screens/MapScreen";
import LayersScreen from "@/screens/LayersScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import Loading from "@/components/Loading";
import DashboardScreen from "@/screens/DashboardScreen";


const Stack = createNativeStackNavigator();


export default function RootNavigator(){
const { user, loading } = useAuthVM();
if (loading) return <Loading/>;
return (
<NavigationContainer>
<Stack.Navigator>
{user ? (
<>
<Stack.Screen name="Dashboard" component={DashboardScreen} />
<Stack.Screen name="Map" component={MapScreen} />
<Stack.Screen name="Layers" component={LayersScreen} />
<Stack.Screen name="Settings" component={SettingsScreen} />
</>
) : (
<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }} />
)}
</Stack.Navigator>
</NavigationContainer>
);
}