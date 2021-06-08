import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from '../game.service';
import { StartComponent } from './start.component';

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

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: GameService, useClass: MockGameService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
