import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Modules
import { ComponentsModule } from './components/components.module';
// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { CarouselComponent } from './front-page/carousel/carousel.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, FrontPageComponent, CarouselComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
