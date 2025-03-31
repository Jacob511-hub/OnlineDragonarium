import { useState, useEffect } from "react";
import api from "../axios";

const useCurrentUser = () => {
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/current-user');
                setUserId(res.data.user_id);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };
        fetchUser();
    }, []);

    return userId;
};

export default useCurrentUser;