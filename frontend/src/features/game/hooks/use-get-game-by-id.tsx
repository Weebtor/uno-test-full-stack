import apiClient from "@/common/config/api/api-client.config";
import { useQuery } from "@tanstack/react-query";
import type { GameModel } from "../types/game.types";
import type { PublicCardModel } from "../types/card.types";
import type { GameBoard } from "../types/game.types";

export const useGetGameById = (id: string) => {
  return useQuery({
    queryKey: ["get-game", id],
    queryFn: async () => {
      return apiClient.get<GameBoard>(`/game/${id}`).then((res) => res.data);
    },
  });
};
