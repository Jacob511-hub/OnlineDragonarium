import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface UseTraitStateProps {
  user_id: string;
  dragon_id: number;
  trait_id: number | null;
}

const useTraitState = ({ user_id, dragon_id, trait_id }: UseTraitStateProps) => {
  const [isOn, setIsOn] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTraitState = async () => {
      if (trait_id === null) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/user-traits`, {
          params: { user_id, dragon_id, trait_id },
        });

        if (response.data && response.data.length > 0) {
          setIsOn(response.data[0].unlocked === true || response.data[0].unlocked === "true");
        } else {
          // If no entry exists, create one with "unlocked: false"
          await axios.post(
            `${API_BASE_URL}/user-traits`,
            {
              user_id,
              dragon_id,
              trait_id,
              unlocked: false,
            },
            { withCredentials: true }
          );
          setIsOn(false);
        }
      } catch (err) {
        setError("Error fetching trait state");
        console.error('Error fetching trait state:', err);
      }
    };

    fetchTraitState();
  }, [trait_id, user_id, dragon_id]);

  const toggleTraitState = async () => {
    if (isOn === null) return;

    const newState = !isOn;
    setIsOn(newState);

    try {
      await axios.patch(
        `${API_BASE_URL}/user-traits`,
        {
          user_id,
          dragon_id,
          trait_id,
          unlocked: newState,
        },
        { withCredentials: true }
      );
    } catch (err) {
      setIsOn(!newState); // Revert state if update fails
      console.error('Error updating trait state:', err);
    }
  };

  return { isOn, error, toggleTraitState };
};

export default useTraitState;
