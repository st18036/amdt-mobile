import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useThemeCtx } from "@/context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useMobilityVM } from "@/viewmodels/useMobilityVM";
import { MaterialIcons } from "@expo/vector-icons";

export default function DashboardScreen() {
  const { darkMode } = useThemeCtx();
  const navigation = useNavigation<any>();
  const { traffic, aq, loading } = useMobilityVM();

  // ✅ Count all visible pin markers
  const activePins = (traffic?.length || 0) + (aq?.length || 0);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: darkMode ? "#0d0d0d" : "#f5f7fa" },
      ]}
    >
      {/* Greeting Section */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: darkMode ? "#fff" : "#000" }]}>
          Kia ora, Kiwi 👋
        </Text>
        <Text style={[styles.subtext, { color: darkMode ? "#aaa" : "#444" }]}>
          Here’s what’s happening today in Aotearoa 🇳🇿
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        {/* Weather */}
        <View
          style={[
            styles.statCard,
            { backgroundColor: darkMode ? "#1c1c1e" : "#ffffff" },
          ]}
        >
          <MaterialIcons
            name="cloud"
            size={28}
            color={darkMode ? "#4da3ff" : "#2a71d0"}
          />
          <Text
            style={[
              styles.statValue,
              { color: darkMode ? "#fff" : "#2a71d0" },
            ]}
          >
            17°C
          </Text>
          <Text
            style={[styles.statLabel, { color: darkMode ? "#aaa" : "#555" }]}
          >
            Auckland Weather
          </Text>
        </View>

        {/* System Status */}
        <View
          style={[
            styles.statCard,
            { backgroundColor: darkMode ? "#1c1c1e" : "#ffffff" },
          ]}
        >
          <MaterialIcons
            name="check-circle"
            size={28}
            color={darkMode ? "#4da3ff" : "#2a71d0"}
          />
          <Text
            style={[
              styles.statValue,
              { color: darkMode ? "#fff" : "#2a71d0" },
            ]}
          >
            Online
          </Text>
          <Text
            style={[styles.statLabel, { color: darkMode ? "#aaa" : "#555" }]}
          >
            System Status
          </Text>
        </View>

        {/* Active Pin Markers */}
        <View
          style={[
            styles.statCard,
            { backgroundColor: darkMode ? "#1c1c1e" : "#ffffff" },
          ]}
        >
          <MaterialIcons
            name="location-pin"
            size={28}
            color={darkMode ? "#4da3ff" : "#2a71d0"}
          />
          <Text
            style={[
              styles.statValue,
              { color: darkMode ? "#fff" : "#2a71d0" },
            ]}
          >
            {loading ? "..." : activePins}
          </Text>
          <Text
            style={[styles.statLabel, { color: darkMode ? "#aaa" : "#555" }]}
          >
            Active Pin Markers
          </Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View
        style={[
          styles.section,
          { backgroundColor: darkMode ? "#1c1c1e" : "#fff" },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#000" }]}>
          Recent Updates
        </Text>
        <Text style={[styles.sectionItem, { color: darkMode ? "#ddd" : "#555" }]}>
          🌧️ Weather layer refreshed with NIWA rainfall data
        </Text>
        <Text style={[styles.sectionItem, { color: darkMode ? "#ddd" : "#555" }]}>
          🚗 Live traffic feed synced from Auckland Transport
        </Text>
        <Text style={[styles.sectionItem, { color: darkMode ? "#ddd" : "#555" }]}>
          🗺️ New environmental zones added to the map
        </Text>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("Map")}
      >
        <MaterialIcons name="explore" size={20} color="#fff" />
        <Text style={styles.actionText}>Start Exploring</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text
        style={{
          textAlign: "center",
          color: darkMode ? "#777" : "#666",
          marginTop: 25,
          fontSize: 13,
        }}
      >
        © 2025 Auckland Mobile Digital Twin — Powered for Aotearoa 🇳🇿
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 15,
    marginTop: 5,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    width: "100%",
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 13,
    marginTop: 3,
    textAlign: "center",
  },
  section: {
    marginTop: 30,
    padding: 18,
    borderRadius: 12,
    width: "100%",
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionItem: {
    fontSize: 14,
    marginBottom: 6,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2a71d0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 30,
    elevation: 4,
    gap: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
