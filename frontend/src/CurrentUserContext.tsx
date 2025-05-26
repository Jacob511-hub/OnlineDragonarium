import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./axios";

const CurrentUserContext = createContext<{ user_id: string | null }>({ user_id: null });

export const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user_id, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/current-user");
                setUserId(res.data.user_id.toString());
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setUserId("guest");
            }
        };
        fetchUser();
    }, []);

    return (
        <CurrentUserContext.Provider value={{ user_id }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(CurrentUserContext);