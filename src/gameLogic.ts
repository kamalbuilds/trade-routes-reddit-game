import { GameState, Player, ResourceType, GamePhase, BoardSpace, SpaceType } from './types';

// Define the GameAction type
export type GameAction = {
  type: 'BUILD_TRADING_POST' | 'UPGRADE_TRADING_POST' | 'END_TURN';
  x?: number;
  y?: number;
};

export function initializeGame(): GameState {
  return {
    players: [],
    currentTurn: 0,
    board: generateBoard(),
    tradingPosts: [],
    gamePhase: GamePhase.WAITING_FOR_PLAYERS
  };
}

function generateBoard(): BoardSpace[][] {
  const board: BoardSpace[][] = [];
  const size = 8;
  
  for (let y = 0; y < size; y++) {
    board[y] = [];
    for (let x = 0; x < size; x++) {
      board[y][x] = {
        x,
        y,
        type: SpaceType.EMPTY
      };
    }
  }
  
  // Add random resource spaces
  for (let i = 0; i < 12; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    board[y][x].type = SpaceType.RESOURCE;
  }
  
  return board;
}

function buildTradingPost(state: GameState, playerId: string, x: number, y: number): GameState {
  // Implementation here
  return state;
}

function upgradeTradingPost(state: GameState, playerId: string, x: number, y: number): GameState {
  // Implementation here
  return state;
}

function endTurn(state: GameState): GameState {
  // Implementation here
  return {
    ...state,
    currentTurn: (state.currentTurn + 1) % state.players.length
  };
}

export function handleTurn(state: GameState, playerId: string, action: GameAction): GameState {
  // Validate turn
  if (state.players[state.currentTurn].id !== playerId) {
    throw new Error('Not your turn!');
  }
  
  // Handle different action types
  switch (action.type) {
    case 'BUILD_TRADING_POST':
      return buildTradingPost(state, playerId, action.x!, action.y!);
    case 'UPGRADE_TRADING_POST':
      return upgradeTradingPost(state, playerId, action.x!, action.y!);
    case 'END_TURN':
      return endTurn(state);
    default:
      return state;
  }
} 