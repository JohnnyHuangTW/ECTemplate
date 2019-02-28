import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap';
import { FakeImageComponent } from './fake-image/fake-image.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { QuantityInputComponent } from './quantity-input/quantity-input.component';

@NgModule({
  declarations: [
    FakeImageComponent,
    ProductThumbnailComponent,
    ProductListComponent,
    DropdownComponent,
    QuantityInputComponent
  ],
  imports: [BrowserModule, PaginationModule.forRoot()],
  exports: [
    FakeImageComponent,
    ProductThumbnailComponent,
    ProductListComponent,
    DropdownComponent,
    QuantityInputComponent
  ]
})
export class ComponentsModule {}
