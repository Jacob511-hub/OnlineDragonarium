import { useState, useEffect } from "react";
import api from "../axios";

const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<number | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/is-admin');
                setIsAdmin(res.data.is_admin);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };
        fetchUser();
    }, []);

    return isAdmin;
};

export default useIsAdmin;