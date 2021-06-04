import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('player name', () => {
    it('should start without value', () => {
      expect(service.getPlayerName()).toBeUndefined();
    });
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
