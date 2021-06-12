import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MultipleChoiceAnswer, MultipleChoiceOption } from '../interfaces';
import { MultipleChoiceQuestion } from '../multiple-choice-question';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.sass']
})
export class MultipleChoiceComponent implements OnInit {
  @Input() name!: string;
  @Input() question$!: Observable<MultipleChoiceQuestion | undefined>
  @Output() submitEvent = new EventEmitter<MultipleChoiceAnswer>();

  // each of these can be undefined, when the question is not a multiple choice question.
  text$!: Observable<string | undefined>
  questionText$!: Observable<string | undefined>
  option1$!: Observable<MultipleChoiceOption | undefined>
  option2$!: Observable<MultipleChoiceOption | undefined>
  option3$!: Observable<MultipleChoiceOption | undefined>
  option4$!: Observable<MultipleChoiceOption | undefined>

  chosenOption?: number;
  choiceForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.choiceForm = new FormGroup({
      choice: new FormControl(this.chosenOption, [
        Validators.required
      ]),
    });
    this.text$ = this.question$.pipe(
      tap(() => this.chosenOption = undefined), // this is a bit of a hack, but rn it works
      tap(() => this.choiceForm.controls['choice'].setValue(undefined)),
      map(q => q?.text));
    this.questionText$ = this.question$.pipe(map(q => q?.question));
    this.option1$ = this.question$.pipe(map(q => q?.options[0]));
    this.option2$ = this.question$.pipe(map(q => q?.options[1]));
    this.option3$ = this.question$.pipe(map(q => q?.options[2]));
    this.option4$ = this.question$.pipe(map(q => q?.options[3]));
  }

  onSubmit(choice: number) {
    if (choice !== undefined) {
      this.submitEvent.next({ answer: choice });
    }
  }
}
