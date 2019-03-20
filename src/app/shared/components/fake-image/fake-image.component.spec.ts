import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeImageComponent } from './fake-image.component';

describe('FakeImageComponent', () => {
  let component: FakeImageComponent;
  let fixture: ComponentFixture<FakeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
