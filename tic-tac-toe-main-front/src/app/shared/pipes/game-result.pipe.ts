import { Pipe, PipeTransform } from '@angular/core';
import { GameResult, Sign } from '../../core/models/game.models';
import { Player } from '../../app.config';

@Pipe({
  name: 'gameResult'
})
export class GameResultPipe implements PipeTransform {

  transform(gameResult: GameResult, gameRole: Sign): string {
    if(!gameResult || gameRole === '') {
      return '';
    }
    if (gameResult.isP1Win) {
      return gameRole === Player.player1 ? 'You win!' : 'You lose';
    }
    if (gameResult.isP2Win) {
      return gameRole === Player.player2 ? 'You win!' : 'You lose';
    }
    return 'Draw';
  }
}
