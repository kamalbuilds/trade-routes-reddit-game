import { Devvit } from '@devvit/public-api';
import { GameState, GamePhase, BoardSpace, SpaceType } from './types';

function getSpaceAppearance(space: BoardSpace): string {
  switch (space.type) {
    case SpaceType.RESOURCE:
      return 'primary';
    case SpaceType.TRADING_POST:
      return 'success';
    default:
      return 'secondary';
  }
}

function getSpaceContent(space: BoardSpace): string {
  switch (space.type) {
    case SpaceType.RESOURCE:
      return '💎';
    case SpaceType.TRADING_POST:
      return '🏪';
    default:
      return '';
  }
}

export function renderGameBoard(state: GameState) {
  return (
    <vstack>
      <hstack>
        <text>Trade Routes</text>
        <text>Turn: {state.currentTurn + 1}</text>
      </hstack>
      
      <grid columns={8}>
        {state.board.map((row, y) => 
          row.map((space, x) => (
            <button
              key={`${x}-${y}`}
              onPress={`space_clicked_${x}_${y}`}
              appearance={getSpaceAppearance(space)}
            >
              {getSpaceContent(space)}
            </button>
          ))
        )}
      </grid>
      
      <hstack>
        {state.players.map(player => (
          <vstack key={player.id}>
            <text>{player.username}</text>
            <text>Score: {player.score}</text>
            <text>Gold: {player.resources.gold}</text>
            <text>Wood: {player.resources.wood}</text>
            <text>Stone: {player.resources.stone}</text>
          </vstack>
        ))}
      </hstack>
      
      {state.gamePhase === GamePhase.WAITING_FOR_PLAYERS && (
        <button onPress="join_game">Join Game</button>
      )}
    </vstack>
  );
} 