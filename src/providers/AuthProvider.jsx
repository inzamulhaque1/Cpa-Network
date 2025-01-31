import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.init";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const signup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // Login function without try-catch
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (user, firstName, lastName, imageUrl) => {
    return updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
      photoURL: imageUrl
    });
  };
  const logout = async () => {
    await signOut(auth); // Log out the user from Firebase
    setUser(null); // Set user state to null after logout
  };

  useEffect(() => {
    // Set up the auth state observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    login,
    signup,
    setUser,
    user,
    updateUserProfile,
    logout
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
