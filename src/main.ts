import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideServiceWorker,
  ServiceWorkerModule,
} from '@angular/service-worker';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app/app.config';

function setDefaultLanguage() {
  const defaultLanguage = 'en';
  document.documentElement.lang = defaultLanguage;
  // Set up the default language for your translation service if you're using one
}

setDefaultLanguage();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);



