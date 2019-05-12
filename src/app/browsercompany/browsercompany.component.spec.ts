import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsercompanyComponent } from './browsercompany.component';

describe('BrowsercompanyComponent', () => {
  let component: BrowsercompanyComponent;
  let fixture: ComponentFixture<BrowsercompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsercompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsercompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
