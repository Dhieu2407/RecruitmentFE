import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagejobdetailComponent } from './managejobdetail.component';

describe('ManagejobdetailComponent', () => {
  let component: ManagejobdetailComponent;
  let fixture: ComponentFixture<ManagejobdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagejobdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagejobdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
