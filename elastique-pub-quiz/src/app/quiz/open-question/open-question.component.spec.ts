import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OpenQuestionComponent } from './open-question.component';

describe('OpenQuestionComponent', () => {
  let component: OpenQuestionComponent;
  let fixture: ComponentFixture<OpenQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenQuestionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenQuestionComponent);
    component = fixture.componentInstance;
    component.question$ = of(undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
