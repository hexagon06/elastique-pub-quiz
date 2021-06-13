import { MultipleChoiceProblem } from './interfaces';
import { MultipleChoiceQuestion } from './multiple-choice-question';
// import { stub } from 'sinon';

describe('MultipleChoiceQuestion', () => {
  let questionSource: MultipleChoiceProblem
  beforeEach(() => {
    questionSource = {
      text: "the text source",
      question: 'the question source',
      image: 'test.png',
      options: [
        { text: 'option 1 text', isCorrect: true },
        { text: 'option 2 text' },
        { text: 'option 3 text' },
        { text: 'option 4 text' },
      ]
    }
  });
  describe('constructor', () => {
    it('should create an instance', () => {
      expect(() => new MultipleChoiceQuestion(questionSource)).toBeTruthy();
    });

    it('should throw an error when the question is null or empty', () => {
      questionSource.question = ''
      expect(() => new MultipleChoiceQuestion(questionSource)).toThrowError();
      questionSource.question = undefined as any;
      expect(() => new MultipleChoiceQuestion(questionSource)).toThrowError();
    });

    it('should check if there are more than one option', () => {
      questionSource.options = [];
      expect(() => new MultipleChoiceQuestion(questionSource)).toThrowError();
    });

    it('should check if there is one option with isCorrect', () => {
      questionSource.options = [{ text: 'option text' }];
      expect(() => new MultipleChoiceQuestion(questionSource)).toThrowError();
      questionSource.options = [
        { text: 'option 1 text', isCorrect: true },
        { text: 'option 2 text', isCorrect: true }];
      expect(() => new MultipleChoiceQuestion(questionSource)).toThrowError();
    });

    it('should assign text, image and question from the source', () => {
      const question = new MultipleChoiceQuestion(questionSource);
      expect(question.text).toEqual(questionSource.text);
      expect(question.question).toEqual(questionSource.question);
      expect(question.image).toEqual(questionSource.image);
    });


    // for some reason the importing of SinonJS goes wrong
    // I still tried the spyOn function but it does not work well with globals


    // it('should shuffle the options from the source', () => {
    //   questionSource.options = [
    //     { text: 'option 1', isCorrect: true },
    //     { text: 'option 2' },
    //     { text: 'option 2' },
    //   ];

    //   // spyOn(Math, 'random').and.returnValues(2, 0, 1);
    //   // stub(Math, 'random').returnValues = [2, 0, 1]

    //   expect(new MultipleChoiceQuestion(questionSource).options).toEqual([
    //     questionSource.options[2],
    //     questionSource.options[0],
    //     questionSource.options[1],
    //   ]);
    // })
  });
  it('should return given answer', () => {
    const question = new MultipleChoiceQuestion(questionSource)
    const answer = 0;;
    question.giveAnswer(answer);
    expect(question.answerGiven).toEqual(question.options[answer].text);
  });
  describe('isAnswered', () => {
    let question: MultipleChoiceQuestion;
    beforeEach(() => { question = new MultipleChoiceQuestion(questionSource) });

    it('should be false when unanswered', () => {
      expect(question.isAnswered).toEqual(false);
    });
    it('should be true when when answer and givenAnswer are not equal', () => {
      question.giveAnswer(2);
      expect(question.isAnswered).toEqual(true);
    });
    it('should be true when answer and given answer match', () => {
      question.giveAnswer(questionSource.options.indexOf(questionSource.options[0]));
      expect(question.isAnswered).toEqual(true);
    });
  });

  describe('isCorrect', () => {
    let question: MultipleChoiceQuestion;
    beforeEach(() => { question = new MultipleChoiceQuestion(questionSource) });

    it('should be undefined when unanswered', () => {
      expect(question.isCorrect).toBeUndefined();
    });
    it('should be false when when answer and givenAnswer are not equal', () => {
      question.giveAnswer(2);
      expect(question.isCorrect).toEqual(false);
    });
    it('should be true when answer and given answer match', () => {
      question.giveAnswer(questionSource.options.indexOf(questionSource.options[0]));
      expect(question.isCorrect).toEqual(true);
    });
  });
});
