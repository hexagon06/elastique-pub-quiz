import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

import { ScoreComponent } from './score.component';

class MockGameService {
  getPlayerName() {
    return '';
  }
  allQuestions = []
}
class MockRouter {

}

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: GameService, useClass: MockGameService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
