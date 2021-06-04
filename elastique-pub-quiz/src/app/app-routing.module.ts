import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './quiz/question/question.component';
import { ScoreComponent } from './quiz/score/score.component';
import { StartComponent } from './quiz/start/start.component';

const routes: Routes = [
  { path: 'quiz', component: StartComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'score', component: ScoreComponent },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
