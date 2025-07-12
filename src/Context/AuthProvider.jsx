import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState();
    const [user, setUser] = useState();

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const signInWithGoogle =()=>{
        return signInWithPopup(auth, provider)
    }

    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

     const logOut = ()=>{
        return signOut(auth)
     }

     const updateUserProfile = profileInfo=>{
        return updateProfile(auth.currentUser, profileInfo)
     }

    const userInfo ={
     user,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    loading,
    updateUserProfile

    }
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)

        })
        return () => {
            unsubscribe();
        }


    }, [])


    return (
        <div>
            <AuthContext value={userInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;