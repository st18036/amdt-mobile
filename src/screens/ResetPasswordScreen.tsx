import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthVM } from "@/viewmodels/useAuthVM";

export default function ResetPasswordScreen() {
  const { forgotPassword } = useAuthVM();
  const [email, setEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shakeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation<any>();

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 5, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const handleReset = async () => {
    setErrorMessage(null);
    setInfoMessage(null);
    if (!email.trim()) {
      triggerShake();
      return setErrorMessage("Please enter your email address.");
    }

    try {
      await forgotPassword(email.trim());
      setInfoMessage("✅ Password reset link sent! Check your inbox.");
    } catch (err: any) {
      triggerShake();
      setErrorMessage(err.message || "Failed to send password reset link.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center",
            color: "#2a71d0",
          }}
        >
          Reset Your Password
        </Text>

        <TextInput
          placeholder="Email Address"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderColor: errorMessage ? "#ff4d4d" : "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        />

        {errorMessage && (
          <Text style={{ color: "#ff4d4d", fontSize: 14, marginBottom: 12, textAlign: "center" }}>
            ⚠️ {errorMessage}
          </Text>
        )}

        {infoMessage && (
          <Text style={{ color: "#28a745", fontSize: 14, marginBottom: 12, textAlign: "center" }}>
            {infoMessage}
          </Text>
        )}

        <Button title="Send Reset Link" color="#2a71d0" onPress={handleReset} />
      </Animated.View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#2a71d0", textAlign: "center" }}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
