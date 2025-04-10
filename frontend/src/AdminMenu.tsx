import React, { useState } from "react";
import useIsAdmin from "./hooks/useIsAdmin";
import useAddDragon from "./hooks/useAddDragon";

const AdminMenu: React.FC = () => {
    const is_admin = useIsAdmin();

    const [menuOpen, setMenuOpen] = useState(false);

    const [name, setName] = useState("");
    const [canBeTrait, setCanBeTrait] = useState(false);
    const [isOnlyTrait, setIsOnlyTrait] = useState(false);
    const [elements, setElements] = useState<string[]>([]);
    const [dragonId, setDragonId] = useState<number>(0);

    const { handleAddDragon } = useAddDragon({
        dragon_id: dragonId,
        name: name,
        can_be_traited: canBeTrait,
        is_only_traited: isOnlyTrait,
        elements: elements,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddDragon();
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div>
            {is_admin && (
                <div>
                    <button onClick={toggleMenu} style={{ cursor: "pointer", position: "absolute", bottom: "10px", left: "10px" }}>
                        {menuOpen ? "Close Admin Menu" : "Open Admin Menu"}
                    </button>
                    {menuOpen && (
                        <div style={{ border: "1px solid #ccc", marginTop: "0.5rem", padding: "0.5rem", position: "absolute", bottom: "50px", left: "10px", backgroundColor: "#fff" }}>
                            <h1>Admin Menu</h1>
                            <p>Element IDs:</p>
                            <ul>
                                <li>1: Fire</li>
                                <li>2: Plant</li>
                                <li>3: Lightning</li>
                                <li>4: Earth</li>
                                <li>5: Cold</li>
                                <li>6: Metal</li>
                                <li>7: Water</li>
                                <li>8: Air</li>
                                <li>9: Light</li>
                                <li>10: Dark</li>
                                <li>11: Rainbow</li>
                            </ul>
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
                                    <label>Dragon ID:</label>
                                    <input
                                        type="number"
                                        value={dragonId}
                                        onChange={(e) => setDragonId(Number(e.target.value))}
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
                                    <input
                                        type="text"
                                        value={elements.join(", ")}
                                        onChange={(e) =>
                                            setElements(e.target.value.split(",").map((el) => el.trim()))
                                        }
                                    />
                                </div>
                                <button type="submit">Add Dragon</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminMenu;