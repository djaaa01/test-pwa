import { bootstrapApplication } from '@angular/platform-browser';
import { provideServiceWorker, ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}).catch(err => console.error(err));