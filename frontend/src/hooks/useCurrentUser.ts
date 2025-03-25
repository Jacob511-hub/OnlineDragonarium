import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useCurrentUser = () => {
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/current-user`, { withCredentials: true });
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