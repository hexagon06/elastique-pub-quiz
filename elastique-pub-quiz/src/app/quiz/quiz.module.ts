import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { FlavorTextComponent } from './flavor-text/flavor-text.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenQuestionComponent } from './open-question/open-question.component';
import { MatDividerModule } from '@angular/material/divider';
import { QuizTitleComponent } from './quiz-title/quiz-title.component';
import { QuizFooterComponent } from './quiz-footer/quiz-footer.component';
import { QuizOptionComponent } from './quiz-option/quiz-option.component';

@NgModule({
  declarations: [
    StartComponent,
    QuestionComponent,
    ScoreComponent,
    MultipleChoiceComponent,
    FlavorTextComponent,
    OpenQuestionComponent,
    QuizTitleComponent,
    QuizFooterComponent,
    QuizOptionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatRadioModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatDividerModule,
  ],
  exports: [
    QuizTitleComponent,
    QuizFooterComponent,
  ]
})
export class QuizModule { }
