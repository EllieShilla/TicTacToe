import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GameRoutingModule } from './game-routing.module';
import { GameRoomComponent } from './container/game-room/game-room.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { StartPageComponent } from './components/start-page/start-page.component';
import { BotGameComponent } from './components/bot-game/bot-game.component';
import { GameFieldOverlayComponent } from './components/game-field-overlay/game-field-overlay.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { LeaderBoardItemComponent } from './components/leader-board-item/leader-board-item.component';


@NgModule({
  declarations: [
    GameRoomComponent,
    StartPageComponent,
    BotGameComponent,
    GameFieldOverlayComponent,
    LeaderBoardComponent,
    LeaderBoardItemComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class GameModule { }
