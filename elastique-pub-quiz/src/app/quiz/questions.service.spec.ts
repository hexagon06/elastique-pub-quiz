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

  it('should have 7 questions', () => {
    const expectedAmount = 7;
    expect(service.all.length).toEqual(expectedAmount);
    expect(service.totalQuestions).toEqual(expectedAmount);
  });
});
