import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-newslist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './newslist.component.html'
})
export class NewslistComponent {
  img:string = 'https://media.gettyimages.com/photos/ashraf-ghani-afghanistans-president-speaks-at-the-council-on-foreign-picture-id850794338?k=6&m=850794338&s=612x612&w=0&h=b_XBw5S38Cioslqr6VL3e36cWQU205IsInqDXZpDOD4=';
  @Input() items:Array<any> = [1,2,3];
}
