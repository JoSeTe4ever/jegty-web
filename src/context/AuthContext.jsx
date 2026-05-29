import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "../data/pocketbase";

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(function (user) {
            setUser(user);
            setShowChild(true);
        });
        return unsubscribe;
    }, []);

    if (!showChild) {
        return <span>cargando</span>;
    } else {
        return (
            <Auth.Provider value={ user }>
                {children}
            </Auth.Provider>
        );
    }
};
