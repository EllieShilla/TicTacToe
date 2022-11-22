import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  readonly fixedButtonVisibleHeight: number = 300;
  readonly fixedButtonVisibleWidth: number = 800;

  constructor() { }

  ngOnInit(): void {
  }

  onUpBtn(): void {
    const nav = document.querySelector('.nav')!;
    nav.scrollIntoView();
  }
}
