// src/components/AuthForm/AuthForm.jsx
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';


export const signUpWithEmail = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up with email:", email);
       
    } catch (err) {
        throw new Error(err.message);
    }
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in with Google:", user);
    } catch (err) {
        throw new Error("Error with Google Sign-In: " + err.message);
    }
};
