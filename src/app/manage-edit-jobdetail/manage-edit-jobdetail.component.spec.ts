import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEditJobdetailComponent } from './manage-edit-jobdetail.component';

describe('ManageEditJobdetailComponent', () => {
  let component: ManageEditJobdetailComponent;
  let fixture: ComponentFixture<ManageEditJobdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEditJobdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEditJobdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
