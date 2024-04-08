import { Component } from '@angular/core';
import { NewslistComponent } from '../../components/pages/newslist/newslist.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';

@Component({
  selector: 'app-knowledge',
  standalone: true,
  imports: [NewslistComponent, PaginationComponent],
  templateUrl: './knowledge.component.html'
})
export class KnowledgeComponent {

}
