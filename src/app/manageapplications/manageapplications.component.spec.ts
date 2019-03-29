import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageapplicationsComponent } from './manageapplications.component';

describe('ManageapplicationsComponent', () => {
  let component: ManageapplicationsComponent;
  let fixture: ComponentFixture<ManageapplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageapplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
