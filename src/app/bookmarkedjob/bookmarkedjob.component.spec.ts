import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedjobComponent } from './bookmarkedjob.component';

describe('BookmarkedjobComponent', () => {
  let component: BookmarkedjobComponent;
  let fixture: ComponentFixture<BookmarkedjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkedjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkedjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
