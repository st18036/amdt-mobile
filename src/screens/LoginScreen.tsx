import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useAuthVM } from "@/viewmodels/useAuthVM";
import { useNavigation } from "@react-navigation/native";  


export default function LoginScreen() {
  const { login, register, user, loading, error } = useAuthVM();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>(); // 👈 enables screen navigation

  // 👇 watch for logged-in user
  useEffect(() => {
    if (user && !loading) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }], // 👈 redirect here
      });
    }
  }, [user, loading]);

  // 👇 optional error popup
  useEffect(() => {
    if (error) Alert.alert("Login Error", error);
  }, [error]);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        Auckland Mobile Digital Twin
      </Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
      />
      <Button title="Login" onPress={() => login(email, password)} />
      <View style={{ height: 8 }} />
      <Button title="Register" onPress={() => register(email, password)} />
    </View>
  );
}