import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryCalculatorComponent } from './notary-calculator.component';

describe('NotaryCalculatorComponent', () => {
  let component: NotaryCalculatorComponent;
  let fixture: ComponentFixture<NotaryCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaryCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaryCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
