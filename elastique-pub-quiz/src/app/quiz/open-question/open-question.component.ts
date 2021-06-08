import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OpenAnswer } from '../interfaces';
import { OpenQuestion } from '../open-question';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.sass']
})
export class OpenQuestionComponent implements OnInit {
  @Input() name!: string;
  @Input() question$!: Observable<OpenQuestion | undefined>
  @Output() submitEvent = new EventEmitter<OpenAnswer>();

  text$!: Observable<string | undefined>
  questionText$!: Observable<string | undefined>

  answeredText?: string;
  answerForm!: FormGroup;

  get answer() {
    return this.answerForm!.get('answer');
  }

  constructor() { }

  ngOnInit(): void {
    this.answerForm = new FormGroup({
      answer: new FormControl(this.answeredText, [
        Validators.required
      ]),
    });
    this.text$ = this.question$.pipe(
      tap(() => this.answerForm.controls['answer'].setValue(undefined)),
      map(q => q?.text));
    this.questionText$ = this.question$.pipe(map(q => q?.question));
  }

  onSubmit() {
    if (this.answerForm.valid) {
      this.submitEvent.next({ answer: this.answerForm.get('answer')?.value });
    }
  }
}
