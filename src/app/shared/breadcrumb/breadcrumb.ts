import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from '../../core/content/content.models';
import { stringsFor } from '../../core/i18n/ui-strings';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  protected readonly text = stringsFor();
  readonly items = input.required<readonly BreadcrumbItem[]>();
}
