import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-adsense',
  standalone: true,
  template: '',
})
export class GoogleAdsSenseComponent {
  trackingCode = import.meta.env['NG_APP_GSENSE'] || '';

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {
    // BROWSER
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script') as HTMLScriptElement;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${this.trackingCode}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      this.renderer.appendChild(this.el.nativeElement, script);
    }
  }
}
