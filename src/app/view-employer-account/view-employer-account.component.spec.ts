import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployerAccountComponent } from './view-employer-account.component';

describe('ViewEmployerAccountComponent', () => {
  let component: ViewEmployerAccountComponent;
  let fixture: ComponentFixture<ViewEmployerAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmployerAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
