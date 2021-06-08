import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isProblem, QuizAnswer, QuizQuestion, isMultipleChoiceAnswer, isMultipleChoiceProblem, isOpenProblem, isOpenAnswer } from './interfaces';
import { QuestionsService } from './questions.service';

const NAME_KEY = 'quiz-name';
const QUESTION_KEY = 'quiz-question-id';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private playerName?: string;
  private cQ: number; // because we do this several times at multiple places we use the setter
  private get currentQuestion() {
    return this.cQ;
  };
  private set currentQuestion(n: number) {
    this.cQ = n;
    localStorage.setItem(QUESTION_KEY, `${n}`);
    this.question$.next(this.getCurrentQuestion());
  }
  private maxQuestions = 0;

  public get allQuestions(): QuizQuestion[] {
    return this.questionsService.all;
  }

  constructor(
    private questionsService: QuestionsService,
  ) {
    this.maxQuestions = questionsService.totalQuestions;
    this.playerName = sessionStorage.getItem(NAME_KEY)?.toString();
    const questionIndex = sessionStorage.getItem(QUESTION_KEY);
    console.log(`session storage item: ${this.playerName}`)
    this.cQ = questionIndex ? parseInt(questionIndex) : -1;
    this.question$.next(this.getCurrentQuestion());
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
    this.currentQuestion = 0;
  }

  public finishGame(): void {
    this.currentQuestion = -1;
  }

  /**
   * Get the current question of the quiz.
   * @returns the current question or undefined when the quiz has not started yet
   */
  public getCurrentQuestion(): QuizQuestion | undefined {
    if (this.currentQuestion !== -1) {
      return this.questionsService.get(this.currentQuestion);
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
        this.currentQuestion++;
      } else {
        // this.currentQuestion++;
        throw new Error(`the question '${question.question}' was not answered`);
      }
    } else {
      // is flavor text
      this.currentQuestion++;
    }

    return this.currentQuestion < this.maxQuestions;
  }

  //------------------REACTIVE----------------------

  private question$ = new BehaviorSubject<QuizQuestion | undefined>(undefined);
  public currentQuestion$ = this.question$.pipe(); // just to expose it as an observable instead of a subject


}
