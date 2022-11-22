import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameCell } from '../../../models/game.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent implements OnInit {
  @Input() cell!: GameCell;
  @Input() playerSymbol$!: Observable<string>;
  @Output() playerMove: EventEmitter<GameCell> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCellClickHandler(): void {
    this.playerMove.emit(this.cell);
  }
}
