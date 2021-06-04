import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StartComponent,
    QuestionComponent,
    ScoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class QuizModule { }
