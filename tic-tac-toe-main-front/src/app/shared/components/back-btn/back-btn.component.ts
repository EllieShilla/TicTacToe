import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss']
})
export class BackBtnComponent {
  @Input() title!: string;
  @Input() link!: string[];
  @Input() className!: string;
}
