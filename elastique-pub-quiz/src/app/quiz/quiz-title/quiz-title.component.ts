import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flavor } from '../flavor';
import { GameService } from '../game.service';

const DEFAULT_TITLE = 'Elastique D&D Pub Quiz'

@Component({
  selector: 'app-quiz-title',
  templateUrl: './quiz-title.component.html',
  styleUrls: ['./quiz-title.component.sass']
})
export class QuizTitleComponent implements OnInit {

  title$!: Observable<string | undefined>;

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.title$ = this.gameService.currentQuestion$.pipe(
      map(q => q === undefined || q instanceof Flavor ? DEFAULT_TITLE : q.question));
  }
}
