import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { QuestionsService } from './questions.service';

@Injectable()
class MockQuestionService extends QuestionsService {

}

describe('GameService', () => {
  let service: GameService;
  // let getItemSpy: SinonSpy;
  // let setItemSpy: SinonSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: QuestionsService, useClass: MockQuestionService }
      ]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('player name', () => {
    // I had some trouble getting SinonSpy to work properly
    // spyOn does not work nicely with globals

    // it('should start without value', () => {
    //   getItemSpy.bind((key: string) => {
    //     return undefined;
    //   });
    //   expect(service.getPlayerName()).toBeUndefined();
    // });

    // it('should use the name from the sessionStorage', () => {
    //   getItemSpy.returnValues = ['set name'];
    //   expect(service.getPlayerName()).toEqual('set name');
    // });

    it('should set the player value', () => {
      const name = 'anem';
      service.setPlayerName(name);
      expect(service.getPlayerName()).toEqual(name);
    });

    it('should change the player name', () => {
      const name1 = 'anem';
      const name2 = 'mane';
      service.setPlayerName(name1);
      service.setPlayerName(name2);
      expect(service.getPlayerName()).toEqual(name2);
    });
  });
});
