import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { localizedPath } from '../../core/i18n/locale';
import { stringsFor } from '../../core/i18n/ui-strings';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  styleUrl: './site-footer.scss',
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly year = new Date().getFullYear();
  protected readonly text = stringsFor();

  // A shorter list than the header's: the footer repeats the main sections
  // plus Contact, not every page.
  protected readonly links = [
    { label: 'Work', path: 'work' },
    { label: 'Engineering', path: 'engineering' },
    { label: 'Writing', path: 'writing' },
    { label: 'Contact', path: 'contact' },
  ].map(({ label, path }) => ({ label, route: localizedPath(path) }));
}
