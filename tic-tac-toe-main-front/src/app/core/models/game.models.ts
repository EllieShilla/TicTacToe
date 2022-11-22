export interface GameCell {
  id: number;
  sign: Sign;
}

export type Sign = 'player1' | 'player2' | '';

export type GameField = GameCell[];

export interface GameResult {
  isP1Win: boolean;
  isP2Win: boolean;
  isDraw: boolean;
}
