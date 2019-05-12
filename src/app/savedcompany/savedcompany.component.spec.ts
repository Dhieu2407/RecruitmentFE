import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedcompanyComponent } from './savedcompany.component';

describe('SavedcompanyComponent', () => {
  let component: SavedcompanyComponent;
  let fixture: ComponentFixture<SavedcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
