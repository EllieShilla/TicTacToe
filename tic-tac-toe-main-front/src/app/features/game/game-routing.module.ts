import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameRoomComponent } from './container/game-room/game-room.component';
import { RouterLinks } from '../../app.config';
import { StartPageComponent } from './components/start-page/start-page.component';
import { BotGameComponent } from './components/bot-game/bot-game.component';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate.guard';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';

const routes: Routes = [
  {
    path: '',
    component: GameRoomComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            redirectTo: RouterLinks.start,
            pathMatch: 'full'
          },
          {
            path: RouterLinks.start,
            component: StartPageComponent
          },
          {
            path: RouterLinks.leaderBoard,
            component: LeaderBoardComponent
          },
          {
            path: RouterLinks.botConfrontation,
            component: BotGameComponent,
            canDeactivate: [ CanDeactivateGuard ]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
