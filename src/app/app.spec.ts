import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose the accessible application shell', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.skip-link')?.textContent).toContain('Pular para o conteúdo');
    expect(compiled.querySelector('app-site-header')).toBeTruthy();
    expect(compiled.querySelector('app-site-footer')).toBeTruthy();
  });

  it('starts with an empty route announcer so a first load says nothing', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const announcer = (fixture.nativeElement as HTMLElement).querySelector('[role="status"]');
    expect(announcer).toBeTruthy();
    expect(announcer?.textContent?.trim()).toBe('');
  });
});
