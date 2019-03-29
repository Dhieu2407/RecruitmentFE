import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NortificationsComponent } from './nortifications.component';

describe('NortificationsComponent', () => {
  let component: NortificationsComponent;
  let fixture: ComponentFixture<NortificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NortificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NortificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
