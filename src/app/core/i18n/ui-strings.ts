import { ContentType } from '../content/content.models';
import { DEFAULT_LOCALE, Locale } from './locale';

/**
 * The site's chrome: navigation, landmarks, controls and the affordances that
 * repeat on every page. Editorial copy — page headlines, section titles, the
 * body of a case study — is content and travels with the content files, not
 * with this catalogue.
 *
 * A second locale supplies this same shape. Nothing here is translated
 * speculatively: `en` appears in UI_STRINGS the day English content does.
 */
export interface UiStrings {
  readonly skipToContent: string;
  readonly brandHome: string;
  readonly primaryNav: string;
  readonly mobileNav: string;
  readonly footerNav: string;
  readonly openMenu: string;
  readonly closeMenu: string;
  readonly toggleTheme: string;
  readonly chooseLanguage: string;
  readonly breadcrumb: string;
  readonly home: string;
  readonly tableOfContents: string;
  readonly onThisPage: string;
  readonly tags: string;
  readonly readingTimeUnit: string;
  readonly readEntry: string;
  readonly relatedEyebrow: string;
  readonly relatedHeading: string;
  readonly topicEyebrow: string;
  readonly topicSummary: (label: string) => string;
  /** The section each content type sits under, for breadcrumbs and links. */
  readonly sections: Record<ContentType, string>;
  readonly nav: readonly { readonly label: string; readonly path: string }[];
}

const pt: UiStrings = {
  skipToContent: 'Pular para o conteúdo',
  brandHome: 'Cláudio Araújo — início',
  primaryNav: 'Navegação principal',
  mobileNav: 'Navegação móvel',
  footerNav: 'Links do rodapé',
  openMenu: 'Menu',
  closeMenu: 'Fechar',
  toggleTheme: 'Alternar tema',
  chooseLanguage: 'Escolher idioma',
  breadcrumb: 'Breadcrumb',
  home: 'Início',
  tableOfContents: 'Neste conteúdo',
  onThisPage: 'Nesta página',
  tags: 'Tags',
  readingTimeUnit: 'min',
  readEntry: 'Ler conteúdo',
  relatedEyebrow: 'Related',
  relatedHeading: 'Continue explorando',
  topicEyebrow: 'Topic',
  topicSummary: (label) => `Conteúdo marcado com ${label}.`,
  sections: {
    project: 'Work',
    article: 'Writing',
    lab: 'Labs',
    decision: 'Architecture Decisions',
    page: 'Início',
  },
  nav: [
    { label: 'Work', path: 'work' },
    { label: 'Engineering', path: 'engineering' },
    { label: 'Labs', path: 'labs' },
    { label: 'Writing', path: 'writing' },
    { label: 'About', path: 'about' },
    { label: 'Now', path: 'now' },
  ],
};

const UI_STRINGS: Partial<Record<Locale, UiStrings>> = { pt };

export const stringsFor = (locale: Locale = DEFAULT_LOCALE): UiStrings => UI_STRINGS[locale] ?? pt;
