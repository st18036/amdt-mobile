import React, { useRef, useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useMobilityVM } from "@/viewmodels/useMobilityVM";
import CityMap from "@/components/CityMap";
import { MaterialIcons } from "@expo/vector-icons";

export default function MapScreen() {
  const { traffic, aq, loading, error, refresh } = useMobilityVM();
  const [showTraffic, setShowTraffic] = useState(true);
  const [showAQ, setShowAQ] = useState(true);
  const mapRef = useRef<any>(null);

  // Zoom in/out functions
  const zoom = (inOrOut: "in" | "out") => {
    if (!mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        latitude: -36.8485,
        longitude: 174.7633,
        latitudeDelta: inOrOut === "in" ? 0.04 : 0.12,
        longitudeDelta: inOrOut === "in" ? 0.04 : 0.12,
      },
      300
    );
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Map */}
      <CityMap
        ref={mapRef}
        traffic={showTraffic ? traffic : []}
        aq={showAQ ? aq : []}
      />

      {/* Zoom Controls */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomBtn} onPress={() => zoom("in")}>
          <MaterialIcons name="zoom-in" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomBtn} onPress={() => zoom("out")}>
          <MaterialIcons name="zoom-out" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Layer Toggles */}
      <View style={styles.bottomPanel}>
        <Button
          title={loading ? "Refreshing..." : "🔄 Refresh"}
          onPress={refresh}
          color="#2a71d0"
        />
        <View style={styles.toggleRow}>
          <Button
            title={showTraffic ? "🚗 Hide Traffic" : "🚦 Show Traffic"}
            onPress={() => setShowTraffic((v) => !v)}
            color={showTraffic ? "#2a71d0" : "#999"}
          />
          <Button
            title={showAQ ? "🌫 Hide Air Quality" : "🌍 Show Air Quality"}
            onPress={() => setShowAQ((v) => !v)}
            color={showAQ ? "#2a71d0" : "#999"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  error: { color: "red", padding: 8 },
  zoomControls: {
    position: "absolute",
    right: 15,
    bottom: 160,
    alignItems: "center",
  },
  zoomBtn: {
    backgroundColor: "#2a71d0",
    borderRadius: 30,
    padding: 10,
    marginVertical: 5,
    elevation: 5,
  },
  bottomPanel: {
  position: "absolute",
  bottom: 10,
  left: 0,
  right: 0,
  backgroundColor: "rgba(255,255,255,0.95)",
  padding: 10,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
},
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
