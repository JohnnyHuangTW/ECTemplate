import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
// Components
import { FakeImageComponent } from './components/fake-image/fake-image.component';
import { ProductThumbnailComponent } from './components/product-thumbnail/product-thumbnail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { QuantityInputComponent } from './components/quantity-input/quantity-input.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';

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
export class SharedModule {}
