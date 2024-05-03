import { Component } from '@angular/core';
import { NewslistComponent } from '../../components/pages/newslist/newslist.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NewslistComponent, PaginationComponent],
  templateUrl: './news.component.html'
})
export class NewsComponent {

}
