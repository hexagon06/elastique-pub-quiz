import { stringify } from "@angular/compiler/src/util";
import { Checkable, OpenProblem } from "./interfaces";

export class OpenQuestion implements OpenProblem, Checkable {
  readonly answer: string;
  readonly text: string;
  readonly question: string;
  private givenAnswer?: string;
  get isAnswered(): boolean {
    return this.givenAnswer !== undefined;
  }
  get isCorrect(): boolean | undefined {
    return this.answer.toLowerCase() === this.givenAnswer?.toLowerCase();
  }

  constructor(problem: OpenProblem) {
    if (isNullOrEmpty(problem.answer)) throw new Error(`invalid problem: ${problem.text}; reason: answer is null or emtpy`);
    if (isNullOrEmpty(problem.question)) throw new Error(`invalid problem: ${problem.text}; reason: question is null or emtpy`);

    this.answer = problem.answer;
    this.text = problem.text;
    this.question = problem.question;
  }

  public giveAnswer(answer: string): void {
    this.givenAnswer = answer;
  }
}

function isNullOrEmpty(s?: string) {
  return s === '' || s === undefined;
}
