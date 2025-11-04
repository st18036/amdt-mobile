import React, { useState, forwardRef, useRef, useImperativeHandle } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { AirQuality, TrafficCongestion } from "@/types/domain";
import { MaterialIcons } from "@expo/vector-icons";

export interface CityMapRef {
  animateToRegion: (region: any, duration?: number) => void;
}

const CityMap = forwardRef<CityMapRef, { traffic: TrafficCongestion[]; aq: AirQuality[] }>(
  ({ traffic, aq }, ref) => {
    const mapViewRef = useRef<MapView>(null);
    const [selected, setSelected] = useState<any>(null);
    const [slideAnim] = useState(new Animated.Value(0));

    const region = {
      latitude: -36.8485,
      longitude: 174.7633,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    };

    useImperativeHandle(ref, () => ({
      animateToRegion: (targetRegion, duration = 300) => {
        mapViewRef.current?.animateToRegion(targetRegion, duration);
      },
    }));

    const handleMarkerPress = (item: any, type: "traffic" | "aq") => {
      setSelected({ ...item, type });
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };

    const closeInfo = () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setSelected(null));
    };

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={region}
        >
          {/* 🚗 Traffic markers */}
          {traffic.map((t) => (
            <Marker
              key={t.id}
              coordinate={t.coord}
              title={t.roadName}
              description={`Congestion: ${t.severity}`}
              pinColor={
                t.severity === "HIGH" ? "red" : t.severity === "MEDIUM" ? "orange" : "green"
              }
              onPress={() => handleMarkerPress(t, "traffic")}
            />
          ))}

          {/* 🌫 Air quality markers */}
          {aq.map((a) => (
            <Marker
              key={a.id}
              coordinate={a.coord}
              title={`Air Quality - ${a.station}`}
              description={`PM2.5: ${a.pm25}, PM10: ${a.pm10}`}
              pinColor={"#4da3ff"}
              onPress={() => handleMarkerPress(a, "aq")}
            />
          ))}
        </MapView>

        {/* 🧭 */}
        {selected && (
          <Animated.View
  style={[
    styles.infoPanel,
    {
      zIndex: 9999, // 👈 ensures it stays above bottomPanel
      elevation: 10, // Android layering
      transform: [
        {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [250, 0],
          }),
        },
      ],
    },
  ]}
>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>
                {selected.type === "traffic"
                  ? `🚗 ${selected.roadName}`
                  : `🌫 ${selected.station}`}
              </Text>
              <TouchableOpacity onPress={closeInfo}>
                <MaterialIcons name="close" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            {selected.type === "traffic" ? (
              <>
                <Text style={styles.infoText}>Severity: {selected.severity}</Text>
                <Text style={styles.infoText}>
                  Last Updated: {new Date(selected.updatedAt).toLocaleTimeString()}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.infoText}>PM2.5: {selected.pm25}</Text>
                <Text style={styles.infoText}>PM10: {selected.pm10}</Text>
                <Text style={styles.infoText}>
                  Last Updated: {new Date(selected.updatedAt).toLocaleTimeString()}
                </Text>
              </>
            )}
          </Animated.View>
        )}
      </View>
    );
  }
);

export default CityMap;

const styles = StyleSheet.create({
  infoPanel: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#8b8b8bff",
  borderTopLeftRadius: 18,
  borderTopRightRadius: 18,
  padding: 18,
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 10,  // 🔹 ensures Android z-layers properly
  zIndex: 9999,   // 🔹 keeps it above toggle buttons
},
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  infoText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 6,
  },
});
