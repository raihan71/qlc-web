import { Component, OnInit } from '@angular/core';
import { CardlistComponent } from '../../components';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { environment } from '../../environments/environment';
import { ContentfulService } from '../../app/services/contentful.service';
import { MetaService } from '../../app/services/metaseo.service';

const CONFIG = environment.contentful_config.contentTypeIds;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardlistComponent,PaginationComponent],
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  product:Array<any> = [1,2,3];
  limit: number = 10;
  skip: number = 0;
  currentPage: number = 1;

  constructor(private cs: ContentfulService, private meta:MetaService) {}

  ngOnInit(): void {
    this.meta.updateTitle(`Program - ${import.meta.env['NG_APP_NAME']}`);
    this.fetchProduct();
  }

  async fetchProduct() {
    const params = {
      content_type: CONFIG.programs,
      limit: this.limit,
      skip: this.skip
    };

    this.cs.getEntries(params).subscribe((programs:any[]) => {
      if (programs && programs.length > 0) {
        const programPromise = programs.map((program: any) => {
          if (program.fields && program.fields.image) {
            const img = program.fields.image.sys.id;
            return this.cs.getSingleImg(img).then((img: string | undefined) => {
              return {
                ...program,
                img
              };
            });
          }
          return program;
        });

        Promise.all(programPromise).then((newProgram) => {
          this.product = newProgram;
        });
      }
    });
  }

  nextPage() {
    this.skip += this.limit;
    this.currentPage++;
    this.fetchProduct();
  }

  previousPage() {
    this.skip -= this.limit;
    if (this.skip < 0) {
      this.skip = 0;
    }
    this.currentPage--;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    this.fetchProduct();
  }

}
