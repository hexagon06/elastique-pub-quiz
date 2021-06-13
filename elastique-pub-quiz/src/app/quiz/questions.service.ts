import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Flavor } from './flavor';
import {
  isFlavorText,
  isMultipleChoiceProblem,
  isOpenProblem,
  MultipleChoiceOption,
  QuizQuestion
} from './interfaces';
import { MultipleChoiceQuestion } from './multiple-choice-question';
import { OpenQuestion } from './open-question';
// this data source would be replaced by something that connects to the server
import * as data from './questions-rp.json';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questions: QuizQuestion[]
  get totalQuestions(): number {
    return this.questions.length;
  }

  get all() {
    return this.questions;
  }

  constructor() {
    const faultyChoices: MultipleChoiceOption[] = [];
    this.questions = (data as any).default.map((d: any) => {
      if (isMultipleChoiceProblem(d)) {
        // just so we can warn us the developers some question options are too long
        d.options.filter(o => o.text.length > 75).forEach(o => faultyChoices.push(o));
        return new MultipleChoiceQuestion(d);
      } else if (isOpenProblem(d)) {
        return new OpenQuestion(d);
      } else if (isFlavorText(d)) {
        return new Flavor(d);
      }
      return undefined;
    }).filter((q: any) => q !== undefined) as QuizQuestion[];
    if (faultyChoices.length > 0) {
      console.warn(`faulty options in this quiz exceeding linelength of 75:\r\n${faultyChoices.map(o => o.text).join('\r\n')}`);
    }
  }

  public get(index: number): QuizQuestion {
    return this.questions[index];
  }
}
