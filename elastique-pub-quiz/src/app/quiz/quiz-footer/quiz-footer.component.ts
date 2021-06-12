import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from '../game.service';

@Component({
  selector: 'app-quiz-footer',
  templateUrl: './quiz-footer.component.html',
  styleUrls: ['./quiz-footer.component.sass']
})
export class QuizFooterComponent implements OnInit {
  counterText$!: Observable<string>;

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.counterText$ = this.gameService.questionIndex$.pipe(
      map(i => i != -1 ? `${i + 1}/${this.gameService.questionCount}` : ''),
    );
  }

}
