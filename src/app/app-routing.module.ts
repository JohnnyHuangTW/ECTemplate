import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent } from './front-page/front-page.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent }
  // { path: 'front-page', component: FrontPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
