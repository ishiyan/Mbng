import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { SnackBarModule } from 'projects/mb/src/lib/snack-bar/snack-bar.module';

import { ScrollerModule } from './shared/scroller/scroller.module';
import { ScrollToTopModule } from './shared/scroll-to-top/scroll-to-top.module';
import { NoteCardModule } from './shared/note-card/note-card.module';
import { NoteListModule } from './shared/note-list/note-list.module';
import { BarSeriesCardModule } from './shared/data/bar-series/bar-series-card/bar-series-card.module';
import { BarSeriesListModule } from './shared/data/bar-series/bar-series-list/bar-series-list.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    SnackBarModule,
    KatexModule,
    ScrollerModule,
    ScrollToTopModule,
    NoteCardModule,
    NoteListModule,
    BarSeriesCardModule,
    BarSeriesListModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
