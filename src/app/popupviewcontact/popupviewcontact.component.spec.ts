import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupviewcontactComponent } from './popupviewcontact.component';

describe('PopupviewcontactComponent', () => {
  let component: PopupviewcontactComponent;
  let fixture: ComponentFixture<PopupviewcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupviewcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupviewcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
