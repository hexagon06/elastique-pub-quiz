import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flavor } from '../flavor';

@Component({
  selector: 'app-flavor-text',
  templateUrl: './flavor-text.component.html',
  styleUrls: ['./flavor-text.component.sass']
})
export class FlavorTextComponent implements OnInit {
  @Input() question$!: Observable<Flavor | undefined>
  @Output() submitEvent = new EventEmitter();

  text$!: Observable<string | undefined>

  constructor() { }

  ngOnInit(): void {
    this.text$ = this.question$.pipe(map(q => q?.text));
  }

  onSubmit() {
    this.submitEvent.next();
  }
}
