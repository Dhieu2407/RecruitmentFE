import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyresumeComponent } from './modifyresume.component';

describe('ModifyresumeComponent', () => {
  let component: ModifyresumeComponent;
  let fixture: ComponentFixture<ModifyresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
