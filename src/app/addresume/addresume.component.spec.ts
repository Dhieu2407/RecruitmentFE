import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresumeComponent } from './addresume.component';

describe('AddresumeComponent', () => {
  let component: AddresumeComponent;
  let fixture: ComponentFixture<AddresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
