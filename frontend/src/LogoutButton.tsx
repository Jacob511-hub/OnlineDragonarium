import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "./hooks/useLogout";

const LogoutButton: React.FC = () => {
    const { isLoggedIn, handleLogout } = useLogout();
    const navigate = useNavigate();

    return (
        <div className="logout-button">
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={() => navigate("/login")}>Login</button>
            )}
        </div>
    );
}

export default LogoutButton;