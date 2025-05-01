import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import AdminMenuElementPicker from "./AdminMenuElementPicker";
import useIsAdmin from "./hooks/useIsAdmin";
import useAddDragon from "./hooks/useAddDragon";
import useUploadImage from "./hooks/useUploadImage";

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
        maxWidth: "75%",
        height: "300px",
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
    const [hint, setHint] = useState("");
    const [dateAdded, setDateAdded] = useState(new Date().toISOString());

    const { handleAddDragon } = useAddDragon({
        name: name,
        can_be_traited: canBeTrait,
        is_only_traited: isOnlyTrait,
        elements: elements,
        hint: hint,
        date_added: dateAdded,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddDragon();
    };

    const { uploadImage } = useUploadImage();

    const handleImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;

        if (fileInput && fileInput.files) {
            const file = fileInput.files[0];
            formData.append("image", file);
        }

        try {
            await uploadImage(formData);
            alert("Image uploaded successfully!");
        } catch (error) {
            alert("Failed to upload image.");
        }
    };

    return (
        <div>
            {is_admin && (
                <div>
                    <button
                        color="secondary"
                        onClick={() => setMenuOpen(true)}
                        className='button-default'
                        style={{ position: "fixed", bottom: "10px", left: "10px", fontSize: "14px" }}
                    >
                        {"Open Admin Menu"}
                    </button>

                    {menuOpen && (
                        <Modal open={menuOpen} onClose={() => setMenuOpen(false)}>
                            <Box sx={modalStyle}>
                                <h1 style={{marginTop: "0px"}}>Add Dragon</h1>
                                <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                                    <div>
                                        <label>Dragon Name: </label>
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
                                    <div>
                                        <label>Breeding Hint: </label>
                                        <input
                                            type="text"
                                            value={hint}
                                            onChange={(e) => setHint(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Date Added: </label>
                                        <input
                                            type="date"
                                            value={dateAdded.split("T")[0]}
                                            onChange={(e) => setDateAdded(e.target.value)}
                                            pattern="\d{4}-\d{2}-\d{2}"
                                            required
                                        />
                                    </div>
                                    <button type="submit">Add Dragon</button>
                                </form>
                                <h1>Add Image</h1>
                                <form onSubmit={handleImageSubmit} style={{ marginTop: "1rem" }}>
                                    <div>
                                        <label>Upload Image:</label>
                                        <input type="file" accept="image/*" required />
                                    </div>
                                    <button type="submit">Upload Image</button>
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