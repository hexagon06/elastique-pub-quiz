import { Flavor } from "./flavor";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { OpenQuestion } from "./open-question";

export interface FlavorText {
  text: string;
}

export interface BaseProblem {
  text: string;
  question: string;
}

export interface OpenProblem extends BaseProblem {
  answer: string;
}

export interface MultipleChoiceProblem extends BaseProblem {
  options: MultipleChoiceOption[];
}

export interface MultipleChoiceOption {
  text: string;
  isCorrect?: true;
}

// export type QuestionScreenData = FlavorText | OpenProblem | MultipleChoiceProblem;
export type QuizQuestion = Flavor | OpenQuestion | MultipleChoiceQuestion;
export interface Checkable {
  isAnswered: boolean;
  isCorrect?: boolean;
}

export function isFlavorText(obj: any): obj is FlavorText {
  const t = obj as FlavorText;
  return t.text !== undefined && typeof (t.text) === 'string';
}

export function isProblem(obj: any): obj is BaseProblem {
  const q = obj as BaseProblem;
  return q.text !== undefined && typeof (q.text) === 'string'
    && q.question !== undefined && typeof (q.question) === 'string';
}

export function isOpenProblem(obj: any): obj is OpenProblem {
  const q = obj as OpenProblem;
  return isProblem(q) &&
    q.answer !== undefined && typeof (q.answer) === 'string';
}

export function isMultipleChoiceProblem(obj: any): obj is MultipleChoiceProblem {
  const q = obj as MultipleChoiceProblem;
  return isProblem(q) &&
    q.options !== undefined;
}

export interface MultipleChoiceAnswer {
  answer: number;
}

export interface OpenAnswer {
  answer: string;
}

export type QuizAnswer = OpenAnswer | MultipleChoiceAnswer | undefined; // undefined for flavor text

export function isMultipleChoiceAnswer(obj: any): obj is MultipleChoiceAnswer {
  const a = obj as MultipleChoiceAnswer;
  return a.answer !== undefined && typeof (a.answer) === 'number';
}

export function isOpenAnswer(obj: any): obj is OpenAnswer {
  const a = obj as OpenAnswer;
  return a.answer !== undefined && typeof (a.answer) === 'string';
}

