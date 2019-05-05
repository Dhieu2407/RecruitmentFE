import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailresumeComponent } from './detailresume.component';

describe('DetailresumeComponent', () => {
  let component: DetailresumeComponent;
  let fixture: ComponentFixture<DetailresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
