import { Component } from '@angular/core';
import { CardlistComponent } from '../../components';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardlistComponent,PaginationComponent],
  templateUrl: './product.component.html'
})
export class ProductComponent {
  items:Array<any> = [1,2,3];

}
