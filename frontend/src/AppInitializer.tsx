import useInitializeTraits from "./hooks/useInitializeTraits";
import useInitializeCounts from "./hooks/useInitializeCounts";
import useFetchAllDragonCounts from "./hooks/useFetchAllDragonCounts";
import { useCurrentUser } from "./CurrentUserContext";

const AppInitializer = () => {
  const { user_id } = useCurrentUser();

  useInitializeTraits();
  useInitializeCounts();

  useFetchAllDragonCounts(user_id ?? "guest");

  return null;
};

export default AppInitializer;