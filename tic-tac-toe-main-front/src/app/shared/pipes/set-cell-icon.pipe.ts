import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'setCellIcon' })

export class SetCellIconPipe implements PipeTransform {
  transform(value: string, playerSymbol: string): string {
    if (value === 'player1') {
      return playerSymbol === 'X'
        ? '../../../../assets/img/game-cross-icon.svg'
        : '../../../../assets/img/game-null-icon.svg'
    }
    return playerSymbol === 'X'
      ? '../../../../assets/img/game-null-icon.svg'
      : '../../../../assets/img/game-cross-icon.svg';
  }
}
