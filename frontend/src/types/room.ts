import type { Player } from "./player";

export interface Room {
  code: string;
  owner: {
    id: string;
    name: string;
  };
  players: Player[];
  game: boolean;
}