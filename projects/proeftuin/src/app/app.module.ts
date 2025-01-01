import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'projects/mb/src/lib/material/material.module';
import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { MathJaxModule } from 'projects/mb/src/lib/math-jax/math-jax.module';
import { SnackBarModule } from 'projects/mb/src/lib/snack-bar/snack-bar.module';

import { ThemePickerModule } from './shared/theme-picker/theme-picker.module';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { FooterModule } from './shared/footer/footer.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        FlexLayoutModule,
        AppRoutingModule,
        MaterialModule,
        ToolbarModule,
        FooterModule,
        ThemePickerModule,
        SnackBarModule,
        KatexModule,
        MathJaxModule.forRoot()
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
