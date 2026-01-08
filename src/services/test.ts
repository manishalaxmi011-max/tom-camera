import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
    collection,
    getDocs,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { auth, db, storage } from "../firebase";

// --- AUTH ---

export const login = async (username: string, password: string) => {
    // Note: For Firebase, "username" should be an "email". 
    // If you want to keep "admin" as username, you can map it to a specific email internally.
    // For simplicity, we assume the user will enter an email, 
    // OR we hardcode the admin email if the username is 'admin'.

    let email = username;
    if (username === 'admin') {
        email = 'admin@rajphotographer.com'; // You must create this user in Firebase Console
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Return a fake "token" object because our UI expects one to set in localStorage
    const token = await userCredential.user.getIdToken();
    return { token, user: userCredential.user };
};

export const logout = async () => {
    await signOut(auth);
};

// --- DATABASE (FIRESTORE) ---

export const getWorks = async () => {
    const querySnapshot = await getDocs(collection(db, "works"));
    // Map Firestore docs to our format, including the ID
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const getWork = async (id: string) => {
    const docRef = doc(db, "works", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("No such document!");
    }
};

export const createWork = async (_token: string, data: any) => {
    // We ignore 'token' because Firebase SDK handles auth state globally 
    // (though securely relying on Firestore Rules)
    const docRef = await addDoc(collection(db, "works"), data);
    return { id: docRef.id, ...data };
};

export const updateWork = async (_token: string, id: string, data: any) => {
    const workRef = doc(db, "works", id);
    await updateDoc(workRef, data);
    return { id, ...data };
};

export const deleteWork = async (_token: string, id: string) => {
    await deleteDoc(doc(db, "works", id));
    return { message: 'Deleted' };
};

// --- STORAGE ---

export const uploadFile = async (_token: string, file: File) => {
    // Create a unique filename
    const filename = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `uploads/${filename}`);

    // Upload
    const snapshot = await uploadBytes(storageRef, file);

    // Get URL
    const url = await getDownloadURL(snapshot.ref);
    return { url };
};
