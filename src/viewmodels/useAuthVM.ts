import { useEffect, useState } from "react";
import { auth, db } from "@/services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  Auth,
} from "firebase/auth";
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { Alert } from "react-native";
import { useThemeCtx } from "@/context/ThemeContext";

export function useAuthVM() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { hydrateForUser } = useThemeCtx();

  // Track authentication state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth as Auth, async (u) => {
      setUser(u);
      setLoading(false);
      await hydrateForUser(u ?? null);
    });
    return () => unsub();
  }, []);

  // ✅ Login existing user
  async function login(email: string, password: string) {
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth as Auth, email, password);

      const ref = doc(db, "users", cred.user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        await updateDoc(ref, {
          lastLogin: serverTimestamp(),
        });
      }

      return cred.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  // ✅ Register new user (send confirmation email instead of verification)
  async function register(email: string, password: string) {
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth as Auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        preferences: { darkMode: false },
      });

      // Send a "confirmation" email using Firebase's Password Reset template
      await sendPasswordResetEmail(auth as Auth, email);
      Alert.alert(
        "Welcome 🎉",
        "Account created! A confirmation email has been sent to your inbox."
      );
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Registration failed", err.message);
      throw err;
    }
  }

  // ✅ Forgot password
  async function forgotPassword(email: string) {
  if (!email) throw new Error("Please enter your email address.");
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("✅ Password reset email sent to:", email);
  } catch (err: any) {
    console.error("❌ Failed to send reset email:", err.message);
    throw err;
  }
}

  // ✅ Logout
  async function logout() {
    await signOut(auth as Auth);
    setUser(null);
  }

  return { user, loading, error, login, register, logout, forgotPassword };
}
