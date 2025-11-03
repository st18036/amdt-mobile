import { useEffect, useState } from "react";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


export function useAuthVM() {
const [user, setUser] = useState<any>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);


useEffect(() => {
const sub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
return () => sub();
}, []);


async function login(email: string, password: string) {
setError(null); await signInWithEmailAndPassword(auth, email, password);
}
async function register(email: string, password: string) {
setError(null); await createUserWithEmailAndPassword(auth, email, password);
}
async function logout() { await signOut(auth); }


return { user, loading, error, login, register, logout };
}