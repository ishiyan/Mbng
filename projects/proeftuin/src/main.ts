import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app/app-routing.module';
import { SnackBarModule } from 'projects/mb/src/lib/snack-bar/snack-bar.module';
import { KatexModule } from 'projects/mb/src/lib/katex/katex.module';
import { MathJaxModule } from 'projects/mb/src/lib/math-jax/math-jax.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FlexLayoutModule, AppRoutingModule, SnackBarModule, KatexModule, MathJaxModule.forRoot()),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
