import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// componentes
import { HeaderComponent } from './components/header/header.component';
import { FormAlquilerComponent } from './components/form-alquiler/form-alquiler.component';
import { TableAlquilerComponent } from './components/table-alquiler/table-alquiler.component';
import { LandingComponent } from './components/landing/landing.component';

// servicios
import { MaquinariasService } from './services/maquinarias.service';
import { AlquilerService } from './services/alquiler.service';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormAlquilerComponent,
    TableAlquilerComponent,
    LandingComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [MaquinariasService, AlquilerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
