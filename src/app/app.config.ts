import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Incremental hydration lets a `@defer (hydrate ...)` block stay as
    // server-rendered DOM until its trigger fires — or forever, with
    // `hydrate never`. It also implies event replay, so an interaction that
    // lands before a block hydrates is queued and replayed rather than lost
    // (docs/SITE-EVOLUTION-PLAN.md D17).
    provideClientHydration(withIncrementalHydration()),
  ],
};
