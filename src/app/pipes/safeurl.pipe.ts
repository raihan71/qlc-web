import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string, type?: string): SafeUrl {
    if (type === 'yt') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }
}
