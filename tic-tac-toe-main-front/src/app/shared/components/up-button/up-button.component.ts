import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-up-button',
  templateUrl: './up-button.component.html',
  styleUrls: ['./up-button.component.scss']
})
export class UpButtonComponent {
  @Output() upScreen: EventEmitter<any> = new EventEmitter();

  onUpBtn(): void {
    this.upScreen.emit();
  }
}
