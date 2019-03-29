import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseresumesComponent } from './browseresumes.component';

describe('BrowseresumesComponent', () => {
  let component: BrowseresumesComponent;
  let fixture: ComponentFixture<BrowseresumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseresumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseresumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
