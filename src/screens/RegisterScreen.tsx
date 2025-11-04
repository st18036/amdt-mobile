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

export default function RegisterScreen() {
  const { register } = useAuthVM();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleRegister = async () => {
    setErrorMessage(null);
    if (!email.trim()) return setErrorMessage("Please enter your email address.");
    if (!password.trim()) return setErrorMessage("Please enter your password.");
    if (password.length < 6)
      return setErrorMessage("Password must be at least 6 characters.");
    if (password !== confirmPassword)
      return setErrorMessage("Passwords do not match.");

    try {
      await register(email.trim(), password);
      navigation.navigate("Login");
    } catch (err: any) {
      triggerShake();
      setErrorMessage(err.message || "Registration failed.");
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
          Create Your Account
        </Text>

        <TextInput
          placeholder="Email"
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

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            borderColor: errorMessage ? "#ff4d4d" : "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        />

        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{
            borderWidth: 1,
            borderColor: errorMessage ? "#ff4d4d" : "#ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
          }}
        />

        {errorMessage && (
          <Text style={{ color: "#ff4d4d", fontSize: 14, marginBottom: 12, textAlign: "center" }}>
            ⚠️ {errorMessage}
          </Text>
        )}

        <Button title="Register" color="#2a71d0" onPress={handleRegister} />
      </Animated.View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#2a71d0", textAlign: "center" }}>
          Already have an account? Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
