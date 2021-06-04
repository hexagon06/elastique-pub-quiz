import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';



@NgModule({
  declarations: [
    StartComponent,
    QuestionComponent,
    ScoreComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QuizModule { }
