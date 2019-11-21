import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRegionAndCountryComponent } from './about-region-and-country.component';

describe('AboutRegionAndCountryComponent', () => {
  let component: AboutRegionAndCountryComponent;
  let fixture: ComponentFixture<AboutRegionAndCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRegionAndCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRegionAndCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
