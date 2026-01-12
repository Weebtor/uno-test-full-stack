import apiClient from "@/common/config/api/api-client.config";
import { useQuery } from "@tanstack/react-query";
import type { GameBoard } from "../types/game.types";

export const useGetActiveGame = () => {
  return useQuery({
    queryKey: ["get-current-game"],
    queryFn: async () => {
      return apiClient.get<GameBoard>("/game/current").then((res) => res.data);
    },
  });
};
