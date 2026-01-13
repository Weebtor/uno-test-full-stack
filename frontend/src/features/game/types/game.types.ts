import type { PublicCardModel } from "./card.types";

export type GameModel = {
  id: string;
  totalCards: number;
  moves: number;
  errors: number;
  status: "finished" | "active";
  createdAt: Date;
  userId: string;
};
export interface GameBoard {
  game: GameModel;
  cards: PublicCardModel[];
}
