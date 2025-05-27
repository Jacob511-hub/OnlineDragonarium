import { useEffect } from "react";
import api from "../axios";
import useDragonCountsStore from "./useDragonCountsStore";

const useFetchAllDragonCounts = (user_id: string) => {
  const { setCounts } = useDragonCountsStore();

  useEffect(() => {
    const fetchAll = async () => {
      if (user_id === "guest") return; // skip for guests

      try {
        const response = await api.get("/user-counts/all");
        const data = response.data;

        for (const count of data) {
          const key = `${user_id}_${count.dragon_id}`;
          setCounts(key, {
            count_normal: count.count_normal,
            count_traited: count.count_traited,
            count_twin: count.count_twin,
            count_traited_twin: count.count_traited_twin,
          });
        }
      } catch (err) {
        console.error("Error fetching all dragon counts:", err);
      }
    };

    fetchAll();
  }, [user_id, setCounts]);
};

export default useFetchAllDragonCounts;