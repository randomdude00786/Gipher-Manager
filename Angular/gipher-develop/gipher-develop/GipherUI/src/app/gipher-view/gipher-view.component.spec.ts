import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GipherViewComponent } from './gipher-view.component';

describe('GipherViewComponent', () => {
  let component: GipherViewComponent;
  let fixture: ComponentFixture<GipherViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GipherViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GipherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
