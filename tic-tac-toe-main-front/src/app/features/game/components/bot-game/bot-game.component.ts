import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonName, RouterLinks } from '../../../../app.config';
import { GameService } from '../../game.service';
import { Observable } from 'rxjs';
import { GameCell, GameField, GameResult, Sign } from '../../../../core/models/game.models';
import { CanComponentDeactivate } from '../../../../core/models/can-component-deactivate.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SaveScoreComponent } from '../../../../shared/components/modals/save-score/save-score.component';
import { DialogWindowService } from '../../../dialog-window/dialog-window.service';

@Component({
  selector: 'app-bot-game',
  templateUrl: './bot-game.component.html',
  styleUrls: ['./bot-game.component.scss']
})
export class BotGameComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  readonly buttonName: typeof ButtonName = ButtonName;
  readonly routerLinks: typeof RouterLinks = RouterLinks;
  readonly linkForBackButton = ['/', RouterLinks.gameRoom, RouterLinks.start];

  gameField$!: Observable<GameField>;
  playerSymbol$!: Observable<string>;
  isEndGame$!: Observable<boolean>;
  gameResult$!: Observable<GameResult>;
  playerRole: Sign = '';

  constructor(
    private gameService: GameService,
    private dialog: MatDialog,
    private dialogService: DialogWindowService
  ) { }

  ngOnInit(): void {
    this.gameService.startGameWithRobot();
    this.initGameField();
    this.initPlayerSymbol();
    this.prepareModalService();
    this.gameResult();
  }

  ngOnDestroy(): void {
    this.gameService.playAgain();
  }

  onCellHandler(cell: GameCell): void {
    if (cell.sign) {
      return;
    }
    this.gameService.playerMove(cell);
  }

  canDeactivate(): Observable<boolean> | boolean {
    let dialogRef!: MatDialogRef<any>;
    const isRedirected = this.dialogService.isRedirectToSignUp || this.dialogService.isRedirectToSignIn;
    if (!isRedirected) {
      dialogRef = this.dialog.open(SaveScoreComponent, {
        hasBackdrop: false
      });
    }
    clearTimeout(this.gameService.gameReloadTimerId);
    return isRedirected ? isRedirected : dialogRef.afterClosed();
  }

  onPreferredSymbol(symbol: string): void {
    this.gameService.changePlayerSymbol(symbol);
  }

  onPlayAgain(): void {
    this.gameService.playAgain();
  }

  private prepareModalService(): void {
    this.dialogService.isRedirectToSignUp = false;
    this.dialogService.isRedirectToSignIn = false;
  }

  private initGameField(): void {
    this.gameField$ = this.gameService.gameField$;
  }

  private initPlayerSymbol(): void {
    this.playerSymbol$ = this.gameService.playerSymbol$;
  }

  private gameResult(): void {
    this.isEndGame$ = this.gameService.isEndGame$;
    this.gameResult$ = this.gameService.gameResult$;
    this.playerRole = this.gameService.playerRole;
  }
}
