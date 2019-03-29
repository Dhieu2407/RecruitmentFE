import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobalertsComponent } from './jobalerts.component';

describe('JobalertsComponent', () => {
  let component: JobalertsComponent;
  let fixture: ComponentFixture<JobalertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobalertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobalertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
