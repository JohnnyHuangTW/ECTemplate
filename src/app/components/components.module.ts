import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap';
import { FakeImageComponent } from './fake-image/fake-image.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [FakeImageComponent, ProductThumbnailComponent, ProductListComponent],
  imports: [BrowserModule, PaginationModule.forRoot()],
  exports: [FakeImageComponent, ProductThumbnailComponent, ProductListComponent]
})
export class ComponentsModule {}
