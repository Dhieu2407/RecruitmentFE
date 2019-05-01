import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCompanyInfoComponent } from './modify-company-info.component';

describe('ModifyCompanyInfoComponent', () => {
  let component: ModifyCompanyInfoComponent;
  let fixture: ComponentFixture<ModifyCompanyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCompanyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
