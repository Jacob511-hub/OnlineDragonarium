import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "./hooks/useLogout";

const LogoutButton: React.FC = () => {
    const { isLoggedIn, handleLogout } = useLogout();
    const navigate = useNavigate();

    return (
        <div className="logout-button">
            {isLoggedIn ? (
                <button className='button-default' onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
            ) : (
                <button className='button-default' onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Login</button>
            )}
        </div>
    );
}

export default LogoutButton;