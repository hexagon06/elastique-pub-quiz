import { Injectable } from '@angular/core';
import {
  FlavorText,
  isFlavorText,
  isMultipleChoiceProblem,
  isOpenProblem,
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

  constructor() {
    this.questions = (data as any).default.map((d: any) => {
      // console.log(d);
      if (isMultipleChoiceProblem(d)) {
        return new MultipleChoiceQuestion(d);
      } else if (isOpenProblem(d)) {
        return new OpenQuestion(d);
      } else if (isFlavorText(d)) {
        return d as FlavorText;
      }
      return undefined;
    }).filter((q: any) => q !== undefined) as QuizQuestion[];
  }

  public get(index: number): QuizQuestion {
    return this.questions[index];
  }
}
