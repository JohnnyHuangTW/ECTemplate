import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FakeImageComponent } from './fake-image/fake-image.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';

@NgModule({
  declarations: [FakeImageComponent, ProductThumbnailComponent],
  imports: [BrowserModule],
  exports: [FakeImageComponent, ProductThumbnailComponent]
})
export class ComponentsModule {}
