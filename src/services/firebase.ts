import { initializeApp, getApps } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBJCK8juJZYetsGM2QuGpGCfbla1AIoric",
  authDomain: "ehodcup.firebaseapp.com",
  databaseURL: "https://ehodcup-default-rtdb.asia-southeast1.firebasedatabase.app", // Updated URL to correct region
  projectId: "ehodcup",
  storageBucket: "ehodcup.firebasestorage.app",
  messagingSenderId: "521565184713",
  appId: "1:521565184713:web:60911a4b9b1c36b82b2318",
  measurementId: "G-XRQR67FZ9Q"
}

// Check if Firebase app is already initialized to prevent duplicate initialization
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

export const db = getDatabase(app)
