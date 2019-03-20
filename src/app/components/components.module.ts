import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FakeImageComponent } from './fake-image/fake-image.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { QuantityInputComponent } from './quantity-input/quantity-input.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';

@NgModule({
  declarations: [
    FakeImageComponent,
    ProductThumbnailComponent,
    ProductListComponent,
    DropdownComponent,
    QuantityInputComponent,
    FieldErrorDisplayComponent
  ],
  imports: [BrowserModule, PaginationModule.forRoot(), LazyLoadImageModule],
  exports: [
    FakeImageComponent,
    ProductThumbnailComponent,
    ProductListComponent,
    DropdownComponent,
    QuantityInputComponent,
    FieldErrorDisplayComponent
  ]
})
export class ComponentsModule {}
