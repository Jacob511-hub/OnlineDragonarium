import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import AdminMenuElementPicker from "./AdminMenuElementPicker";
import useIsAdmin from "./hooks/useIsAdmin";
import useAddDragon from "./hooks/useAddDragon";

const slideDownFade = keyframes`
    from {
        transform: translate(-50%, -60%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
`;

const AdminMenu: React.FC = () => {
    const is_admin = useIsAdmin();

    const [menuOpen, setMenuOpen] = useState(false);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%, -50%)",
        animation: `${slideDownFade} 0.3s ease-out`,
        width: "450px",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
        overflowY: 'auto',
        outline: 'none',
        '&:focus-visible': {
            outline: 'none',
        }, 
    };

    const [name, setName] = useState("");
    const [canBeTrait, setCanBeTrait] = useState(false);
    const [isOnlyTrait, setIsOnlyTrait] = useState(false);
    const [elements, setElements] = useState<number[]>([]);

    const { handleAddDragon } = useAddDragon({
        name: name,
        can_be_traited: canBeTrait,
        is_only_traited: isOnlyTrait,
        elements: elements,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddDragon();
    };

    return (
        <div>
            {is_admin && (
                <div>
                    <button
                        color="secondary"
                        onClick={() => setMenuOpen(true)}
                        style={{ position: "absolute", bottom: "10px", left: "10px" }}>
                        {"Open Admin Menu"}
                    </button>

                    {menuOpen && (
                        <Modal open={menuOpen} onClose={() => setMenuOpen(false)}>
                            <Box sx={modalStyle}>
                                <h1 style={{marginTop: "0px"}}>Admin Menu</h1>
                                <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                                    <div>
                                        <label>Dragon Name:</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Can Be Traited:</label>
                                        <input
                                            type="checkbox"
                                            checked={canBeTrait}
                                            onChange={() => setCanBeTrait(!canBeTrait)}
                                        />
                                    </div>
                                    <div>
                                        <label>Is Only Traited:</label>
                                        <input
                                            type="checkbox"
                                            checked={isOnlyTrait}
                                            onChange={() => setIsOnlyTrait(!isOnlyTrait)}
                                        />
                                    </div>
                                    <div>
                                        <label>Elements (comma separated):</label>
                                        <AdminMenuElementPicker elements={elements} setElements={setElements} />
                                    </div>
                                    <button type="submit">Add Dragon</button>
                                </form>
                            </Box>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminMenu;