import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductThumbnailComponent } from './product-thumbnail.component';

describe('ProductThumbnailComponent', () => {
  let component: ProductThumbnailComponent;
  let fixture: ComponentFixture<ProductThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
