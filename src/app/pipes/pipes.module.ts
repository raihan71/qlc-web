import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ToHtmlPipe } from './richtext-to-html.pipe';
import { SanitizedHtmlPipe } from './sanitized-html.pipe';
import { EllipsisPipe } from './elipsis.pipe';
import { HtmlToPlaintextPipe } from './html-to-text.pipe';
import { SafePipe } from './safeurl.pipe';

@NgModule({
  declarations: [ToHtmlPipe, SanitizedHtmlPipe, EllipsisPipe, HtmlToPlaintextPipe, SafePipe],
  imports: [
    CommonModule
  ],
  exports: [ToHtmlPipe, SanitizedHtmlPipe, EllipsisPipe, DatePipe, HtmlToPlaintextPipe, SafePipe],
})
export class PipesModule { }
