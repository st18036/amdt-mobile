import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthVM } from "@/viewmodels/useAuthVM";

export default function LoginScreen() {
  const { login, user, loading } = useAuthVM();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shakeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation<any>();

  // Auto-login if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigation.reset({ index: 0, routes: [{ name: "Main" }] });
    }
  }, [user, loading]);

  // Shake animation for wrong password/email
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  // Login handler
  const handleLogin = async () => {
    setErrorMessage(null);
    if (!email.trim()) return setErrorMessage("Please enter your email address.");
    if (!password.trim()) return setErrorMessage("Please enter your password.");

    try {
      await login(email.trim(), password.trim());
      navigation.reset({ index: 0, routes: [{ name: "Main" }] });
    } catch (err: any) {
      triggerShake();
      const code = err.code || "";
      const messageMap: any = {
        "auth/invalid-email": "Invalid email format.",
        "auth/user-not-found": "No account found with that email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/too-many-requests": "Too many failed attempts. Try again later.",
      };
      setErrorMessage(messageMap[code] || "Login failed. Please check your details.");
    }
  };

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2a71d0" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[styles.card, { transform: [{ translateX: shakeAnim }] }]}>
          <Text style={styles.title}>Auckland Mobile Digital Twin</Text>

          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, errorMessage && { borderColor: "#ff4d4d" }]}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.input, errorMessage && { borderColor: "#ff4d4d" }]}
          />

          {errorMessage && <Text style={styles.error}>⚠️ {errorMessage}</Text>}

          <View style={{ marginTop: 10 }}>
            <Button title="Login" color="#2a71d0" onPress={handleLogin} />
          </View>
        </Animated.View>

        <View style={styles.links}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.linkText}>Don’t have an account? Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
            <Text style={[styles.linkText, { marginTop: 8 }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#2a71d0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  error: {
    color: "#ff4d4d",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  links: {
    marginTop: 28,
    alignItems: "center",
  },
  linkText: {
    color: "#2a71d0",
    textAlign: "center",
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
