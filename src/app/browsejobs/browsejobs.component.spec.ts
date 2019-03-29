import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsejobsComponent } from './browsejobs.component';

describe('BrowsejobsComponent', () => {
  let component: BrowsejobsComponent;
  let fixture: ComponentFixture<BrowsejobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsejobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsejobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
