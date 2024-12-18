import { Devvit } from '@devvit/public-api';
import { GameState, Player, ResourceType } from './types';
import { initializeGame, handleTurn } from './gameLogic';
import { renderGameBoard } from './ui';

const app = new Devvit();

// Game state stored in KV Storage
let gameState: GameState;

app.post.onCreate(async (context) => {
  const initialState = await initializeGame();
  await context.kvStore.put('gameState', initialState);
  
  return {
    components: renderGameBoard(initialState)
  };
});

app.onAction('join_game', async (context) => {
  const state = await context.kvStore.get('gameState') as GameState;
  if (state.players.length >= 4) {
    return { success: false, message: 'Game is full!' };
  }
  
  const newPlayer: Player = {
    id: context.userId,
    username: context.userId,
    resources: {
      [ResourceType.GOLD]: 5,
      [ResourceType.WOOD]: 3,
      [ResourceType.STONE]: 3
    },
    score: 0
  };
  
  state.players.push(newPlayer);
  await context.kvStore.put('gameState', state);
  
  return {
    components: renderGameBoard(state)
  };
});

export default app; 