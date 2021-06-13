import { Checkable, MultipleChoiceOption, MultipleChoiceProblem, OpenProblem } from "./interfaces";

export class MultipleChoiceQuestion implements MultipleChoiceProblem, Checkable {
  readonly options: MultipleChoiceOption[];
  readonly text: string;
  readonly question: string;
  readonly image: string;

  private givenAnswer?: number;

  get isAnswered(): boolean {
    return this.givenAnswer !== undefined;
  }
  get isCorrect(): boolean | undefined {
    return this.givenAnswer !== undefined ? this.options[this.givenAnswer].isCorrect === true : undefined;
  }

  constructor(problem: MultipleChoiceProblem) {
    if (isNullOrEmpty(problem.question)) throw new Error(`invalid problem: ${problem.text}; reason: question is null or emtpy`);
    if (problem.options.length === 0) throw new Error(`invalid problem ${problem.text}; reason: 0 options given`);
    if (problem.options.filter(o => o.isCorrect).length !== 1) throw new Error(`invalid problem ${problem.text}; reason: 0 or more than 1 option isCorrect`);

    this.options = shuffle(problem.options);
    this.text = problem.text;
    this.question = problem.question;
    this.image = problem.image;
  }

  public giveAnswer(answer: number): void {
    this.givenAnswer = answer;
  }

  public get answerGiven() {
    if (this.givenAnswer !== undefined) {
      return this.options[this.givenAnswer].text;
    }
    return undefined;
  }

  public get rightAnswer() {
    return this.options.find(o => o.isCorrect)?.text;
  }
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.round(Math.random()) === 0 ? -1 : 1);
}

function isNullOrEmpty(s?: string) {
  return s === '' || s === undefined;
}
