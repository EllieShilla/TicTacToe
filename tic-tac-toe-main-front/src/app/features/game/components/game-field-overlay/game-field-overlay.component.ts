import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GameResult, Sign } from '../../../../core/models/game.models';

@Component({
  selector: 'app-game-field-overlay',
  templateUrl: './game-field-overlay.component.html',
  styleUrls: ['./game-field-overlay.component.scss']
})
export class GameFieldOverlayComponent {
  @Input() gameResult$!: Observable<GameResult>;
  @Input() playerRole: Sign = '';

  @Output() playAgain: EventEmitter<void> = new EventEmitter();

  playAgainHandler(): void {
    this.playAgain.emit();
  }
}
