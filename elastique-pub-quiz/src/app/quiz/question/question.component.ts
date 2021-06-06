import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { FlavorText, isFlavorText, isMultipleChoiceProblem, isOpenProblem, QuizQuestion } from '../interfaces';
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

  constructor(
    private router: Router,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.name = this.gameService.getPlayerName();

    this.setQuestion();
  }

  setQuestion(): void {
    const question = this.question = this.gameService.getCurrentQuestion();
    // not the prettyest. If I have time I will find a proper templated typecheck way
    if (isMultipleChoiceProblem(question)) {
      this.multiQuestion = question;
      this.openQuestion = this.flavorText = undefined;
    } else if (isOpenProblem(question)) {
      this.openQuestion = question;
      this.multiQuestion = this.flavorText = undefined;
    } else if (isFlavorText(question)) {
      this.flavorText = question;
      this.multiQuestion = this.openQuestion = undefined;
    }
  }

  onSubmit(event: Event): void {
    // todo: do this with rxjs
    const c = this.gameService.continueAdventure();
    console.log(`c: ${c}`)
    if (c) {
      console.log('set question')
      this.setQuestion();
    } else {
      console.log('goto score')
      this.router.navigate(['score']);
    }
  }
}
