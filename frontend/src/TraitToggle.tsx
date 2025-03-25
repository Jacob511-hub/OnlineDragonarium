import React, { useState, useEffect } from "react";
import axios from "axios";
import useTraits from './hooks/useTraits';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TraitToggle: React.FC<{ trait: string, user_id: number, dragon_id: number }> = ({ trait, user_id, dragon_id }) => {
    const [isOn, setIsOn] = useState<boolean | null>(null);
    const { traits, error } = useTraits();

    const traitData = traits.find(t => t.name.toLowerCase() === trait.toLowerCase());  
    const trait_id = traitData ? traitData.id : null;

    useEffect(() => {
        if (trait_id === null) return;

        const fetchTraitState = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user-traits`, {
                    params: { user_id, dragon_id, trait_id },
                });

                if (response.data && response.data.length > 0) {
                    setIsOn(response.data[0].unlocked === true || response.data[0].unlocked === "true");
                } else {
                    // If no entry exists, create one with "unlocked: false"
                    await axios.post(`${API_BASE_URL}/user-traits`, {
                        user_id,
                        dragon_id,
                        trait_id,
                        unlocked: false,
                    }, { withCredentials: true });
                    setIsOn(false);
                }
            } catch (err) {
                console.error('Error fetching trait state:', err);
            }
        };

        fetchTraitState();
    }, [trait_id, user_id, dragon_id]);

    // Return early if trait_id isn't found or if there's an error
    if (error) return <div>Error: {error}</div>;
    if (trait_id === null) return null;

    // Handle toggle click to update state and backend
    const handleClick = async () => {
        if (isOn === null) return;

        const newState = !isOn;
        setIsOn(newState);

        try {
            await axios.patch(`${API_BASE_URL}/user-traits`, {
                user_id,
                dragon_id,
                trait_id,
                unlocked: newState,
            }, { withCredentials: true });
        } catch (err) {
            console.error('Error updating trait state:', err);
            setIsOn(!newState); // Revert state if update fails
        }
    };

    return (
        <img
            src={`/images/traits/${trait}-${isOn ? 'on' : 'off'}.png`}
            alt={trait}
            onClick={handleClick}
            style={{ cursor: 'pointer', transition: 'opacity 0.3s', opacity: isOn ? 1 : 0.3 }}
        />
    );
};

export default TraitToggle;