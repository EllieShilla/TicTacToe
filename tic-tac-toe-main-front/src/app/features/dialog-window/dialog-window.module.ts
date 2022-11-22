import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogWindowComponent } from './dialog-window.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    DialogWindowComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    DialogWindowComponent
  ]
})
export class DialogWindowModule { }
