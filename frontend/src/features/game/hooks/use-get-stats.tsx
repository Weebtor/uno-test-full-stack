import apiClient from "@/common/config/api/api-client.config";
import { useQuery } from "@tanstack/react-query";
import { type GameModel } from "../types/game.types";

const useGetStats = () => {
  return useQuery({
    queryKey: ["get-stats"],
    queryFn: async () => {
      return apiClient
        .get<GameModel[]>("stats/past-results")
        .then((res) => res.data);
    },
  });
};

export default useGetStats;
