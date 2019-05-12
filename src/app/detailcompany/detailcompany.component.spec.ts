import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcompanyComponent } from './detailcompany.component';

describe('DetailcompanyComponent', () => {
  let component: DetailcompanyComponent;
  let fixture: ComponentFixture<DetailcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
