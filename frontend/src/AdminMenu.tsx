import React from "react";
import useCurrentUser from "./hooks/useCurrentUser";

const AdminMenu: React.FC = () => {
    const user_id = useCurrentUser();
    const userIdString = user_id !== null ? user_id.toString() : "guest";

    return (
        <div>
        </div>
    );
};

export default AdminMenu;