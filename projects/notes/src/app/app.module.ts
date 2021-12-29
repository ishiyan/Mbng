import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MbModule } from 'projects/mb/src/lib/mb.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
