import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GameCell, GameField } from '../../models/game.models';
import { GameService } from '../../../features/game/game.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {
  @Input() gameField$!: Observable<GameField>;
  @Input() playerSymbol$!: Observable<string>;
  @Output() playersMove: EventEmitter<GameCell> = new EventEmitter<GameCell>();

  horizontalLine$!: Observable<string>;
  diagonalLine$!: Observable<string>;
  playersSymbol$!: Observable<string>;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.initPlayersSymbol();
    this.initWinLine();
  }

  onCellHandler(cell: GameCell): void {
    this.playersMove.emit(cell);
  }

  private initPlayersSymbol(): void {
    this.playersSymbol$ = this.gameService.playerSymbol$;
  }

  private initWinLine(): void {
    this.horizontalLine$ = this.gameService.horizontalLine$;
    this.diagonalLine$ = this.gameService.diagonalLine$;
  }
}
