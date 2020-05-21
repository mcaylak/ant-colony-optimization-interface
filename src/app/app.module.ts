import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgCircleProgressModule} from "ng-circle-progress";
import {NgxSpinnerModule} from "ngx-spinner";
import {AgmCoreModule} from "@agm/core";
import { MapComponent } from './map/map.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import {MatIconModule} from "@angular/material/icon";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {fab, faFacebook} from "@fortawesome/free-brands-svg-icons";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MapComponent,
    IntroComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    NgCircleProgressModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwLByXGWaCTOWmngwjhp9hk8hiG2MOFyw',
      libraries: ['places']
    }),
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    FontAwesomeModule
  ],
  providers: [],
  exports: [
    FontAwesomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab);
  }

}
