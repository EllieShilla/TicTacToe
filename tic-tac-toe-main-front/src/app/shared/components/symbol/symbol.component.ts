import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.scss']
})
export class SymbolComponent implements OnInit {
  @Output() changeSymbol: EventEmitter<string> = new EventEmitter<string>();

  symbolSubscription$!: Observable<string>;

  preferredSymbol: FormGroup = new FormGroup({
    symbol: new FormControl('X')
  })

  ngOnInit(): void {
    this.symbolSubscription$ = this.preferredSymbol.get('symbol')!.valueChanges.pipe(
      tap(value => this.changeSymbol.emit(value))
    )
  }
}
