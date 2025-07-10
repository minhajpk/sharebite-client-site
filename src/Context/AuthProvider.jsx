import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithPopup,} from 'firebase/auth';
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


    const userInfo ={
     user,
    createUser,
    signInWithGoogle,
    loading

    }

    return (
        <div>
            <AuthContext value={userInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;