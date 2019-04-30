import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageapplicationdetailComponent } from './manageapplicationdetail.component';

describe('ManageapplicationdetailComponent', () => {
  let component: ManageapplicationdetailComponent;
  let fixture: ComponentFixture<ManageapplicationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageapplicationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageapplicationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
