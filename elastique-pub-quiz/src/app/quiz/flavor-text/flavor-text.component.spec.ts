import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QuestionsService } from '../questions.service';
import { FlavorTextComponent } from './flavor-text.component';

class MockQuestionService extends QuestionsService {

}
describe('FlavorTextComponent', () => {
  let component: FlavorTextComponent;
  let fixture: ComponentFixture<FlavorTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlavorTextComponent],
      providers: [{ provide: QuestionsService, useClass: MockQuestionService }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorTextComponent);
    component = fixture.componentInstance;
    component.question$ = of(undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
