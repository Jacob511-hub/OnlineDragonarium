import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "./hooks/useLogout";

const RegisterButton: React.FC = () => {
    const { isLoggedIn } = useLogout();
    const navigate = useNavigate();

    return (
        <div className="register-button">
            {isLoggedIn ? (
                <button className='button-default' onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>Sign up</button>
            ) : (
                <></>
            )}
        </div>
    );
}

export default RegisterButton;