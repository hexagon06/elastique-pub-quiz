import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flavor } from '../flavor';
import { GameService } from '../game.service';
import { FlavorText, MultipleChoiceOption, QuizAnswer, QuizQuestion } from '../interfaces';
import { MultipleChoiceQuestion } from '../multiple-choice-question';
import { OpenQuestion } from '../open-question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {
  name?: string;
  question?: QuizQuestion;
  multiQuestion?: MultipleChoiceQuestion;
  openQuestion?: OpenQuestion;
  flavorText?: FlavorText;
  chosenOption?: MultipleChoiceOption;

  multiQuestion$!: Observable<MultipleChoiceQuestion | undefined>;
  openQuestion$!: Observable<OpenQuestion | undefined>;
  flavorText$!: Observable<FlavorText | undefined>;

  constructor(
    private router: Router,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.name = this.gameService.getPlayerName();
    this.multiQuestion$ = this.gameService.currentQuestion$.pipe(
      map(q => q instanceof MultipleChoiceQuestion ? q : undefined));
    this.openQuestion$ = this.gameService.currentQuestion$.pipe(
      map(q => q instanceof OpenQuestion ? q : undefined));
    this.flavorText$ = this.gameService.currentQuestion$.pipe(
      map(q => q instanceof Flavor ? q : undefined));
  }

  onSubmit(answer: QuizAnswer): void {
    // todo: do this with rxjs
    const c = this.gameService.continueAdventure(answer);
    if (!c) {
      this.router.navigate(['score']);
    }
  }
}
