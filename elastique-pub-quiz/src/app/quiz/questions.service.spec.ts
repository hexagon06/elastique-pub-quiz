import { TestBed } from '@angular/core/testing';
import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const questionAmount = 15;
  it(`should have ${questionAmount} questions`, () => {
    expect(service.all.length).toEqual(questionAmount);
    expect(service.totalQuestions).toEqual(questionAmount);
  });
});
