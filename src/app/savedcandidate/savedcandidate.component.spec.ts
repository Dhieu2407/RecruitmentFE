import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedcandidateComponent } from './savedcandidate.component';

describe('SavedcandidateComponent', () => {
  let component: SavedcandidateComponent;
  let fixture: ComponentFixture<SavedcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
