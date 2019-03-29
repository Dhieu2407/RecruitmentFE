import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageresumesComponent } from './manageresumes.component';

describe('ManageresumesComponent', () => {
  let component: ManageresumesComponent;
  let fixture: ComponentFixture<ManageresumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageresumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageresumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
