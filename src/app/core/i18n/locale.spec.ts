import { describe, expect, it } from 'vitest';
import { publishedLocales } from '../../generated/locales.generated';
import { contentManifest } from '../../generated/content-manifest.generated';
import {
  DEFAULT_LOCALE,
  LANGUAGE_TAG,
  localeFromPath,
  localizedPath,
  SECTION_FOR_TYPE,
} from './locale';

describe('localizedPath', () => {
  it('builds the locale home for an empty path', () => {
    expect(localizedPath()).toBe('/pt');
    expect(localizedPath('')).toBe('/pt');
  });

  it('prefixes a section with the locale', () => {
    expect(localizedPath('work')).toBe('/pt/work');
    expect(localizedPath('engineering/decisions')).toBe('/pt/engineering/decisions');
  });

  it('puts the same section under another locale without touching it', () => {
    expect(localizedPath('work', 'en')).toBe('/en/work');
    expect(localizedPath('', 'en')).toBe('/en');
  });

  it('never doubles a slash, whichever way the caller writes the path', () => {
    expect(localizedPath('/work')).toBe('/pt/work');
    expect(localizedPath('work/')).toBe('/pt/work');
    expect(localizedPath('/work/')).toBe('/pt/work');
  });
});

describe('localeFromPath', () => {
  it('reads the locale back out of a route', () => {
    expect(localeFromPath('/pt/work/lucyos')).toBe('pt');
    expect(localeFromPath('/en/writing/x')).toBe('en');
  });

  it('falls back to the default for a path that names no locale', () => {
    expect(localeFromPath('/')).toBe(DEFAULT_LOCALE);
    expect(localeFromPath('/rss.xml')).toBe(DEFAULT_LOCALE);
  });

  it('round-trips with localizedPath', () => {
    for (const locale of ['pt', 'en'] as const) {
      expect(localeFromPath(localizedPath('labs', locale))).toBe(locale);
    }
  });
});

describe('published locales', () => {
  it('lists exactly the locales the content declares', () => {
    const fromContent = [...new Set(contentManifest.map((entry) => entry.locale))].sort();
    expect([...publishedLocales].sort()).toEqual(fromContent);
  });

  it('includes the default locale, which `/` redirects to', () => {
    expect(publishedLocales).toContain(DEFAULT_LOCALE);
  });

  it('has a language tag for every published locale', () => {
    for (const locale of publishedLocales) {
      expect(LANGUAGE_TAG[locale], `no language tag for ${locale}`).toBeTruthy();
    }
  });
});

describe('SECTION_FOR_TYPE', () => {
  // The Node build derives routes from its own copy of this map
  // (tools/content/markdown.mjs). If the two drift, links built in the browser
  // stop matching the routes that were generated.
  it('agrees with the route every entry was generated with', () => {
    for (const entry of contentManifest) {
      if (entry.type === 'page') continue;
      const section = SECTION_FOR_TYPE[entry.type];
      expect(entry.route, `${entry.route} does not sit under ${section}`).toBe(
        localizedPath(`${section}/${entry.slug}`, entry.locale),
      );
    }
  });
});
