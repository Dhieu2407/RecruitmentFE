import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacadidateComponent } from './listacadidate.component';

describe('ListacadidateComponent', () => {
  let component: ListacadidateComponent;
  let fixture: ComponentFixture<ListacadidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacadidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacadidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
