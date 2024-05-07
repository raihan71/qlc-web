import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/pages/footer/footer.component';
import { AboutMeService } from './services/about-me.service';
import { ContentfulService } from './services/contentful.service';
import { aboutMe } from './models/aboutMe';
import { PipesModule } from './pipes/pipes.module';
import { environment } from '../environments/environment';

const CONFIG = environment.contentful_config.contentTypeIds;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, PipesModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  about:aboutMe = {};
  waMe:string = '//api.whatsapp.com/send?phone=';
  socials:Array<any> = [];

  constructor(
    private _aboutMe: AboutMeService,
    private cs: ContentfulService,
    public route: Router
  ) {
    this._aboutMe.getData().subscribe((entry: aboutMe) => {
      this.about = entry;
      const { logo } = this.about;
      this.cs.getSingleImg(logo.sys.id).then((image: any) => {
        Object.assign(this.about, { image });
      });
    });
    this.cs.getEntries({content_type:CONFIG.socials}).subscribe({
      next:((entries:Array<any>) => {
        this.socials = entries.map(entry => {
          return {
            ...entry,
            icon: entry.fields.icon,
          }
        });
      })
    });
  }
}
