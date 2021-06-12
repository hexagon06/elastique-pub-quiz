import { Checkable, OpenProblem } from "./interfaces";

export class OpenQuestion implements OpenProblem, Checkable {
  readonly answer: string;
  readonly text: string;
  readonly question: string;
  readonly image: string;

  private givenAnswer?: string;
  get isAnswered(): boolean {
    return this.givenAnswer !== undefined;
  }
  get isCorrect(): boolean | undefined {
    return this.givenAnswer ? this.answer.toLowerCase() === this.givenAnswer.toLowerCase() : undefined;
  }

  constructor(problem: OpenProblem) {
    if (isNullOrEmpty(problem.answer)) throw new Error(`invalid problem: ${problem.text}; reason: answer is null or emtpy`);
    if (isNullOrEmpty(problem.question)) throw new Error(`invalid problem: ${problem.text}; reason: question is null or emtpy`);

    this.answer = problem.answer;
    this.text = problem.text;
    this.question = problem.question;
    this.image = problem.image;
  }

  public giveAnswer(answer: string): void {
    this.givenAnswer = answer;
  }

  public get answerGiven() {
    return this.givenAnswer;
  }

  public get rightAnswer() {
    // this one only to have the same interface as the other question type
    return this.answer;
  }
}

function isNullOrEmpty(s?: string) {
  return s === '' || s === undefined || s === null;
}
