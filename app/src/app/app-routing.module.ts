import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizStartComponent } from './quiz-module/quiz-start/quiz-start.component';

const routes: Routes = [
  { path: 'quiz', component: QuizStartComponent },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
