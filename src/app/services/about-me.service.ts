import { Injectable } from '@angular/core';
import { ContentfulService } from './contentful.service';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor(
    private cs: ContentfulService
  ) {}

  getData() {
    return this.cs.getEntry(import.meta.env['NG_APP_ABOUTME']);
  };
}
