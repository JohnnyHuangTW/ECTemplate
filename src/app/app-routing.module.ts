import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent } from './front-page/front-page.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductDetailComponent } from './category/product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  {
    path: 'category',
    component: CategoryComponent,
    children: [
      { path: ':category', component: CategoryListComponent },
      { path: 'product/:id', component: ProductDetailComponent }
    ]
  },
  { path: 'shopping-cart', component: ShoppingCartComponent }

  // { path: 'front-page', component: FrontPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
