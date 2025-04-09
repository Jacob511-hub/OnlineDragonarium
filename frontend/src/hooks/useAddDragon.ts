import axios from "axios";
import api from "../axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface AddDragonParams {
  dragon_id: number;
  name: string;
  can_be_traited: boolean;
  is_only_traited: boolean;
  elements: string[];
}

const useAddDragon = (params: AddDragonParams) => {
  const handleAddDragon = async () => {
    try {
      const res = await api.post('/add-dragons', params);
      alert(res.data.message);

    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        alert("Unauthorized access");
      } else {
        alert("Failed to add dragon");
      }
    }
  };

  return { handleAddDragon };
};

export default useAddDragon;