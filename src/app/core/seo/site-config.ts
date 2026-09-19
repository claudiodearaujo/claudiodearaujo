import { InjectionToken } from '@angular/core';
import { isPreview, siteOrigin } from '../../generated/site-config.generated';

export interface SiteConfig {
  /** Absolute origin used for canonical URLs, og:url and structured data. Empty when unknown. */
  readonly origin: string;
  /** Preview deployments must never be indexed. */
  readonly isPreview: boolean;
}

/**
 * The build writes these values from the environment. Injecting them keeps the
 * generated module out of the consumers, which can then be tested per origin.
 */
export const SITE_CONFIG = new InjectionToken<SiteConfig>('SITE_CONFIG', {
  providedIn: 'root',
  factory: () => ({ origin: siteOrigin, isPreview }),
});
