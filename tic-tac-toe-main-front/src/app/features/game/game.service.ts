import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, take, tap, timer } from 'rxjs';
import { GameCell, GameField, GameResult, Sign } from '../../core/models/game.models';
import { GameFieldStartState, GameResultInitValue, Player } from '../../app.config';
import { LoaderService } from '../../core/components/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameField$$: BehaviorSubject<GameField> = new BehaviorSubject(GameFieldStartState);
  private playerSymbol$$: BehaviorSubject<string> = new BehaviorSubject('X');
  private horizontalLine$$: BehaviorSubject<string> = new BehaviorSubject('');
  private diagonalLine$$: BehaviorSubject<string> = new BehaviorSubject('');
  private isEndGame$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private gameResult$$: BehaviorSubject<GameResult> = new BehaviorSubject(GameResultInitValue);
  private isGameWithBot: boolean = false;

  gameField$: Observable<GameField> = this.gameField$$.asObservable();
  playerSymbol$: Observable<string> = this.playerSymbol$$.asObservable();
  diagonalLine$: Observable<string> = this.diagonalLine$$.asObservable();
  horizontalLine$: Observable<string> = this.horizontalLine$$.asObservable();
  isEndGame$: Observable<boolean> = this.isEndGame$$.asObservable();
  gameResult$: Observable<GameResult> = this.gameResult$$.asObservable();
  playerRole: Sign = '';
  gameReloadTimerId!: ReturnType<typeof setTimeout>;

  constructor(
    private loaderService: LoaderService
  ) { }

  playerMove({id}: GameCell): void {
    this.changePlayerSign(id, Player.player1);
    this.afterPlayerMoveCheck();
  }

  changePlayerSymbol(symbol: string): void {
    this.playerSymbol$$.next(symbol);
  }

  clearField(): void {
    this.gameField$$.next(GameFieldStartState);
    this.horizontalLine$$.next('');
    this.diagonalLine$$.next('');
  }

  startGameWithRobot(): void {
    this.isGameWithBot = true;
    this.playerRole = Player.player1;
  }

  playAgain(): void {
    this.clearField();
    this.resetGameResult();
    this.removeOverlay();
  }

  private stopGameWithRobot(): void {
    this.isGameWithBot = false;
  }

  private resetGameResult(): void {
    this.gameResult$$.next(GameResultInitValue);
  }

  private removeOverlay(): void {
    this.isEndGame$$.next(false);
  }

  private afterPlayerMoveCheck(): void {
    const isPlayerWon = this.checkIsPlayerWon(Player.player1);
    const isDraw = this.isGameDraw();
    this.gameResult();
    if (!isPlayerWon && !isDraw) {
      this.botMove();
    }
    else {
      this.stopGameWithRobot();
    }
  }
  private changePlayerSign(id: number, player: Player): void {
    let changedCell = this.getCellById(id);
    changedCell.sign = player;
    const refreshedField = structuredClone(this.gameField$$.value);
    refreshedField.splice(changedCell.id, 1, changedCell);
    this.gameField$$.next(refreshedField)
  }

  private botMove(): void {
    const chosenCell = this.chooseCell();
    this.loaderService.showLoader();
    timer(500).pipe(
      tap(() => this.changePlayerSign(chosenCell.id, Player.player2)),
      take(1),
      finalize(() => {
        this.loaderService.hideLoader();
        this.gameResult();
      })
    ).subscribe()
  }

  private chooseCell(): GameCell {
    let cell;
    while (!cell) {
      const cellId = this.getRandomCellId()
      let changedCell = this.getCellById(cellId);
      if (!changedCell.sign) {
        cell = changedCell;
      }
    }
    return cell;
  }

  private getCellById(cellId: number): GameCell {
    return this.copyStartField().find(({id}) => cellId === id)!;
  }

  private copyStartField(): GameField {
    return structuredClone(this.gameField$$.value)
  }

  private getRandomCellId(): number {
    return Math.floor(Math.random() * 9);
  }

  private isGameDraw(): boolean {
    return !this.checkIsPlayerWon(Player.player1)
      && !this.checkIsPlayerWon(Player.player2)
      && this.gameField$$.value.every(({sign}) => Boolean(sign))
  }

  private isEndGame(gameResult: GameResult) {
    const isEndGame = Object.values(gameResult).some(item => !!item);
    this.isEndGame$$.next(isEndGame);
    if (isEndGame) {
      this.gameReloadTimerId = setTimeout(() => {
        this.playAgain();
      }, 3000)
    }
  }

  private gameResult() {
    const gameResult: GameResult = {
      isP1Win: this.checkIsPlayerWon(Player.player1),
      isP2Win: this.checkIsPlayerWon(Player.player2),
      isDraw: this.isGameDraw()
    }
    this.isEndGame(gameResult);
    this.gameResult$$.next(gameResult);
  }

  private checkIsPlayerWon(player: Sign): boolean {
    if (this.checkCells(0,1,2, player)) {
      this.horizontalLine$$.next('line1');
      return true;
    }
    if (this.checkCells(3,4,5, player)) {
      this.horizontalLine$$.next('line2');
      return true;
    }
    if (this.checkCells(6,7,8, player)) {
      this.horizontalLine$$.next('line3');
      return true;
    }
    if (this.checkCells(0,4,8, player)) {
      this.diagonalLine$$.next('line4');
      return true;
    }
    if (this.checkCells(2,4,6, player)) {
      this.diagonalLine$$.next('line5');
      return true;
    }
    if (this.checkCells(0,3,6, player)) {
      this.horizontalLine$$.next('line6');
      return true;
    }
    if (this.checkCells(1,4,7, player)) {
      this.horizontalLine$$.next('line7');
      return true;
    }
    if (this.checkCells(2,5,8, player)) {
      this.horizontalLine$$.next('line8');
      return true;
    }
    return false;
  }

  private checkCells(i1: number, i2: number, i3: number, player: Sign): boolean {
    const { value } = this.gameField$$
    return value[i1].sign.includes(player)
      && value[i2].sign.includes(player)
      && value[i3].sign.includes(player);
  }
}

