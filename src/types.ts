export enum ResourceType {
  GOLD = 'gold',
  WOOD = 'wood',
  STONE = 'stone'
}

export interface Player {
  id: string;
  username: string;
  resources: Record<ResourceType, number>;
  score: number;
}

export interface GameState {
  players: Player[];
  currentTurn: number;
  board: BoardSpace[][];
  tradingPosts: TradingPost[];
  gamePhase: GamePhase;
}

export interface BoardSpace {
  x: number;
  y: number;
  type: SpaceType;
  ownerId?: string;
}

export interface TradingPost {
  x: number;
  y: number;
  ownerId: string;
  level: number;
}

export enum GamePhase {
  WAITING_FOR_PLAYERS,
  IN_PROGRESS,
  COMPLETED
}

export enum SpaceType {
  EMPTY,
  RESOURCE,
  TRADING_POST
} 