import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorTextComponent } from './flavor-text.component';

describe('FlavorTextComponent', () => {
  let component: FlavorTextComponent;
  let fixture: ComponentFixture<FlavorTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlavorTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
