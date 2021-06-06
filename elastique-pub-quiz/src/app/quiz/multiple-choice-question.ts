import { Checkable, MultipleChoiceOption, MultipleChoiceProblem, OpenProblem } from "./interfaces";

export class MultipleChoiceQuestion implements MultipleChoiceProblem, Checkable {
  options: MultipleChoiceOption[];
  text: string;
  question: string;
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
  }

  public giveAnswer(answer: number): void {
    this.givenAnswer = answer;
  }
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.fround(Math.random()) === 0 ? -1 : 1);
}

function isNullOrEmpty(s?: string) {
  return s === '' || s === undefined;
}
