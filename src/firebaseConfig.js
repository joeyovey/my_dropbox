import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyArQtdX1SmbyjW--DsKC9BZ3nFWPJrYRAI",
  authDomain: "drop-box-905b1.firebaseapp.com",
  projectId: "drop-box-905b1",
  storageBucket: "drop-box-905b1.appspot.com",
  messagingSenderId: "1073796093455",
  appId: "1:1073796093455:web:dcba31fce0c052dec1757a",
  measurementId: "G-SQ5KWSMWW4"
});

const firestore = app.firestore();

export const db = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

// Function to delete a folder from Firebase
export function deleteFolder(folderId) {
  return db.folders.doc(folderId).delete();
}

export const storage = app.storage();
export const auth = app.auth();
export default app;
