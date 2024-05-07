import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: [
    `.active { color: rgb(22 163 74) !important; }`
  ]
})
export class NavbarComponent {
  isNavbarFixed: boolean = false;
  showMenuMobile: boolean = false;
  @Input() logo: string = '';
  @Input() name: any;

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 100) {
      this.isNavbarFixed = true;
    } else {
      this.isNavbarFixed = false;
    }
  }

  constructor() {}

  handleShowMenuMobile() {
    this.showMenuMobile = !this.showMenuMobile;
  }
}
