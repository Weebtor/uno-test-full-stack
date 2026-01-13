import apiClient from "@/common/config/api/api-client.config";
import { useQuery } from "@tanstack/react-query";
import type { GameBoard } from "../types/game.types";

export const useGetGameById = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["get-game", id],
    queryFn: async () => {
      return apiClient.get<GameBoard>(`/stats/${id}`).then((res) => res.data);
    },
  });
};
