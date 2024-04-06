import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ClientsComponent } from '../components/clients/clients.component';
import { FeatureComponent } from '../components/feature/feature.component';
import { CardlistComponent } from '../components/cardlist/cardlist.component';
import { FaqComponent } from '../components/faq/faq.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent,
    HeroComponent, ClientsComponent, FeatureComponent, CardlistComponent,
    FaqComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'qlc-app';
  carousel:any;

  constructor() {}
}
