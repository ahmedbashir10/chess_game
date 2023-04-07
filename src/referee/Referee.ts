import { PieceType, TeamType, Piece } from "../components/chessboard";

export default class Referee {
  // Function tileIsOccupied used for if a tile is occupied by another piece
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  // Function to show if a tile is occupied by enemy
  tileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  // Function move pawn
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    // Pawns Valid Moves

    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      // Movement LOGIC
      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === 1 * pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }
      // Attack Logic
      else if (x - px === -1 && y - py === pawnDirection) {
        // Attack in Upper or Bottom left corner
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          console.log("We can strike!");
          // return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        // Attack in Upper or Bottom right corner
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          console.log("We can strike!");

          // return true;
        }
      }
      return false;
    }
  }
}
