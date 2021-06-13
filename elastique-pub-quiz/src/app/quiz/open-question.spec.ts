import { OpenProblem } from './interfaces';
import { OpenQuestion } from './open-question';

describe('OpenQuestion', () => {
  let questionSource: OpenProblem;
  beforeEach(() => {
    questionSource = {
      text: 'text source',
      question: 'question source',
      image: 'test.png',
      answer: 'answer source',
    };
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      expect(new OpenQuestion(questionSource)).toBeTruthy();
    });

    it('should throw an error when question is null or empty', () => {
      questionSource.question = '';
      expect(() => new OpenQuestion(questionSource)).toThrowError();
      questionSource.question = null as any;
      expect(() => new OpenQuestion(questionSource)).toThrowError();
    });

    it('should throw an error when answer is null or empty', () => {
      questionSource.answer = '';
      expect(() => new OpenQuestion(questionSource)).toThrowError();
      questionSource.answer = null as any;
      expect(() => new OpenQuestion(questionSource)).toThrowError();
    });

    it('should use answer, text, image and question from the source', () => {
      const question = new OpenQuestion(questionSource);

      expect(question.text).toEqual(questionSource.text);
      expect(question.question).toEqual(questionSource.question);
      expect(question.answer).toEqual(questionSource.answer);
      expect(question.image).toEqual(questionSource.image);
    })
  });

  it('should return given answer', () => {
    const question = new OpenQuestion(questionSource)
    const answer = 'some answer';
    question.giveAnswer(answer);
    expect(question.answerGiven).toEqual(answer);
  });

  describe('isAnswered', () => {
    let question: OpenQuestion;
    beforeEach(() => { question = new OpenQuestion(questionSource) });

    it('should be false when unanswered', () => {
      expect(question.isAnswered).toEqual(false);
    });
    it('should be true when when answer and givenAnswer are not equal', () => {
      question.giveAnswer('somethign else');
      expect(question.isAnswered).toEqual(true);
    });
    it('should be true when answer and given answer match', () => {
      question.giveAnswer(questionSource.answer);
      expect(question.isAnswered).toEqual(true);
    });
  });

  describe('isCorrect', () => {
    let question: OpenQuestion;
    beforeEach(() => { question = new OpenQuestion(questionSource) });

    it('should be undefined when unanswered', () => {
      expect(question.isCorrect).toBeUndefined();
    });
    it('should be false when when answer and givenAnswer are not equal', () => {
      question.giveAnswer('somethign else');
      expect(question.isCorrect).toEqual(false);
    });
    it('should be true when answer and given answer match', () => {
      question.giveAnswer(questionSource.answer);
      expect(question.isCorrect).toEqual(true);
    });
  });
});
