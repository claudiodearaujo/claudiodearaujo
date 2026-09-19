import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let document: Document;

  const create = () => TestBed.runInInjectionContext(() => new ThemeService());

  beforeEach(() => {
    document = TestBed.inject(DOCUMENT);
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete document.documentElement.dataset['theme'];
  });

  it('adopts the theme the inline boot script already applied', () => {
    document.documentElement.dataset['theme'] = 'light';
    expect(create().theme()).toBe('light');
  });

  it('falls back to dark for a missing or unknown attribute', () => {
    delete document.documentElement.dataset['theme'];
    expect(create().theme()).toBe('dark');

    document.documentElement.dataset['theme'] = 'sepia';
    expect(create().theme()).toBe('dark');
  });

  it('toggles the signal, the document and the stored preference together', () => {
    document.documentElement.dataset['theme'] = 'dark';
    const service = create();

    service.toggle();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');

    service.toggle();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('still applies the theme when storage is unavailable', () => {
    document.documentElement.dataset['theme'] = 'dark';
    const service = create();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError');
    });

    expect(() => service.toggle()).not.toThrow();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
