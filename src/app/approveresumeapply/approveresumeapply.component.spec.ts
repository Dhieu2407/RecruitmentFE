import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveresumeapplyComponent } from './approveresumeapply.component';

describe('ApproveresumeapplyComponent', () => {
  let component: ApproveresumeapplyComponent;
  let fixture: ComponentFixture<ApproveresumeapplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveresumeapplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveresumeapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
