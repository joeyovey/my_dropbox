import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, collection, serverTimestamp } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyArQtdX1SmbyjW--DsKC9BZ3nFWPJrYRAI",
  authDomain: "drop-box-905b1.firebaseapp.com",
  projectId: "drop-box-905b1",
  storageBucket: "drop-box-905b1.appspot.com",
  messagingSenderId: "1073796093455",
  appId: "1:1073796093455:web:dcba31fce0c052dec1757a",
  measurementId: "G-SQ5KWSMWW4"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = {
  folders: collection(getFirestore(app), "folders"),
  files: collection(getFirestore(app), "files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: serverTimestamp
}
export const storage = getStorage(app)

export default app
