import React from "react";
import { View, Text, Switch, StyleSheet, Button, Alert } from "react-native";
import { useThemeCtx } from "@/context/ThemeContext";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const { darkMode, setDarkMode } = useThemeCtx();
  const { logout } = useAuthVM();
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Signed out", "You have been logged out.");
      // ✅ Redirect user back to login screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#121212" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>
        Settings
      </Text>

      <View style={styles.row}>
        <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 16 }}>
          Dark Mode
        </Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={{ height: 24 }} />
      <Button title="Sign out" color="#d9534f" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
