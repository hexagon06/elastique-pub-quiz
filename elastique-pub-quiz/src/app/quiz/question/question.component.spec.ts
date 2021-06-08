import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from '../game.service';

import { QuestionComponent } from './question.component';

class MockGameService {
  getPlayerName() {
    return '';
  }
  get currentQuestion$() {
    return of(undefined);
  }
}
class MockRouter {

}

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: GameService, useClass: MockGameService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
