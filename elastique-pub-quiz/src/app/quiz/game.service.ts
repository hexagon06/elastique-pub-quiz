import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isProblem, QuizAnswer, QuizQuestion, isMultipleChoiceAnswer, isMultipleChoiceProblem, isOpenProblem, isOpenAnswer } from './interfaces';
import { QuestionsService } from './questions.service';

const NAME_KEY = 'quiz-name';
const QUESTION_KEY = 'quiz-question-id';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private playerName?: string;
  private currentQuestionIndex$ = new BehaviorSubject<number>(-1);
  public currentQuestion$: Observable<QuizQuestion | undefined>; // derived from currentQuestionIndex$

  /** Get the current index in the ful list of questions */
  public get questionIndex() { return this.currentQuestionIndex$.getValue(); }
  public get questionIndex$() { return this.currentQuestionIndex$.pipe(); }

  private maxQuestions: number;
  public get questionCount() { return this.maxQuestions; }

  public get allQuestions(): QuizQuestion[] {
    return this.questionsService.all;
  }

  constructor(
    private questionsService: QuestionsService,
  ) {
    this.maxQuestions = questionsService.totalQuestions;
    this.playerName = sessionStorage.getItem(NAME_KEY)?.toString();
    const questionIndex = sessionStorage.getItem(QUESTION_KEY);
    this.currentQuestionIndex$.next(questionIndex ? parseInt(questionIndex) : -1);
    this.currentQuestion$ = this.currentQuestionIndex$.pipe(
      tap(i => sessionStorage.setItem(QUESTION_KEY, `${i}`)), // as a side effect of a new index value we also store it in the session
      map(i => i !== -1 ? this.questionsService.get(i) : undefined) // we map the index to an actual question
    );
  }

  public getPlayerName(): string | undefined {
    return this.playerName;
  }

  public setPlayerName(name: string) {
    this.playerName = name;
    sessionStorage.setItem(NAME_KEY, name);
  }

  public startGame(): void {
    // would normally let the server know this player is ready
    this.currentQuestionIndex$.next(0);
  }

  public finishGame(): void {
    this.currentQuestionIndex$.next(-1);
  }

  /**
   * Get the current question of the quiz.
   * @returns the current question or undefined when the quiz has not started yet
   */
  private getCurrentQuestion(): QuizQuestion | undefined {
    if (this.questionIndex !== -1) {
      return this.questionsService.get(this.questionIndex);
    }
    return undefined;
  }

  /**
   * Continue to the next question. will throw an error if the question has not been answered
   */
  public continueAdventure(answer: QuizAnswer): boolean {
    const question = this.getCurrentQuestion();
    if (isProblem(question)) {
      if (isMultipleChoiceAnswer(answer) && isMultipleChoiceProblem(question)) {
        question.giveAnswer(answer.answer);
      } else if (isOpenAnswer(answer) && isOpenProblem(question)) {
        question.giveAnswer(answer.answer);
      }
      if (question.isAnswered) {
        this.currentQuestionIndex$.next(this.questionIndex + 1);
      } else {
        throw new Error(`the question '${question.question}' was not answered`);
      }
    } else {
      // is flavor text
      this.currentQuestionIndex$.next(this.questionIndex + 1);
    }

    return this.questionIndex < this.maxQuestions;
  }
}
