import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MultipleChoiceOption } from '../interfaces';

@Component({
  selector: 'app-quiz-option',
  templateUrl: './quiz-option.component.html',
  styleUrls: ['./quiz-option.component.sass']
})
export class QuizOptionComponent implements OnInit {
  @Input() option!: MultipleChoiceOption | undefined | null;
  @Input() value!: number;
  @Output() optionSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.optionSelected.emit(this.value);
  }
}
