import React, { useEffect, useState } from "react";
import { app } from "../data/firebase";

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        app.auth().onAuthStateChanged(function (user) {
            setUser(user);
            setShowChild(true);
        });
    }, []);

    if (!showChild) {
        return <span>cargando</span>;
    } else {
        return (
            <Auth.Provider value={{ user }}>
                {children}
            </Auth.Provider>
        );
    }
};