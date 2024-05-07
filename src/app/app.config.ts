import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DISQUS_SHORTNAME } from 'ngx-disqus';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

registerLocaleData(localeId, 'id');

const env = import.meta.env['NG_APP_DISQUS'] || '';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(),
    importProvidersFrom([BrowserAnimationsModule]),
    {
      provide: DISQUS_SHORTNAME,
      useValue: env
    },
    {
      provide: LOCALE_ID,
      useValue: 'id-ID'
    }
  ]
};
