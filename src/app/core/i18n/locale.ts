export type Locale = 'pt' | 'en';

/**
 * The locale `/` resolves to, and the one every helper here assumes when no
 * other is given. Publishing a second language does not change it — only an
 * editorial decision to lead in another language would.
 */
export const DEFAULT_LOCALE: Locale = 'pt';

/** The `lang`/`hreflang` tag for each locale, which is not the same string. */
export const LANGUAGE_TAG: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
};

export const LOCALE_LABEL: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
};

/** Where each content type lives below its locale — the mirror of
 *  `sectionForType` in tools/content/markdown.mjs, which generates the routes
 *  these paths have to match. */
export const SECTION_FOR_TYPE = {
  project: 'work',
  article: 'writing',
  lab: 'labs',
  decision: 'engineering/decisions',
} as const;

/**
 * Builds a route for a path stated relative to its locale, so no caller has to
 * write a language into a link: `localizedPath('work')` → `/pt/work`, and
 * `localizedPath('')` → `/pt`.
 *
 * This is the single place a locale is turned into a URL. Before E7 the string
 * `/pt` appeared in 67 places across 18 files, which is what made publishing a
 * second language a rewrite rather than a content decision.
 */
export const localizedPath = (path = '', locale: Locale = DEFAULT_LOCALE): string => {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${locale}/${trimmed}` : `/${locale}`;
};

/** The locale a route belongs to, read back from its first segment. */
export const localeFromPath = (path: string): Locale => {
  const [, segment] = path.split('/');
  return segment === 'en' || segment === 'pt' ? segment : DEFAULT_LOCALE;
};
