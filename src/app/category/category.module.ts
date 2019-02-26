import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategorySidebarComponent } from './category-sidebar/category-sidebar.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    CategoryComponent,
    CategorySidebarComponent,
    CategoryListComponent,
    ProductDetailComponent
  ],
  imports: [BrowserModule, RouterModule],
  exports: [
    CategoryComponent,
    CategorySidebarComponent,
    CategoryListComponent,
    ProductDetailComponent
  ]
})
export class CategoryModule {}
