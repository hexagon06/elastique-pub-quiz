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
  flavorText$!: Observable<FlavorText | undefined>;

  constructor(
    private router: Router,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.name = this.gameService.getPlayerName();
    this.multiQuestion$ = this.gameService.currentQuestion$.pipe(
      // tap(q => console.log(`q: ${q instanceof MultipleChoiceQuestion}`)),
      // tap(q => console.log(q)),
      map(q => q instanceof MultipleChoiceQuestion ? q : undefined));
    this.flavorText$ = this.gameService.currentQuestion$.pipe(
      map(q => q instanceof Flavor ? q : undefined));
  }

  onSubmit(answer: QuizAnswer): void {
    // todo: do this with rxjs
    const c = this.gameService.continueAdventure(answer);
    // console.log(`c: ${c}`)
    if (c) {
      // console.log('set question')
      // this.setQuestion();
    } else {
      // console.log('goto score')
      this.router.navigate(['score']);
    }
  }
}
