import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NoteListModule } from './shared/note-list/note-list.module';
import { SeriesListModule } from './shared/data/series-list/series-list.module';
import { KatexSettingsModule } from './shared/katex-settings/katex-settings.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        NoteListModule,
        SeriesListModule,
        KatexSettingsModule,
        AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
