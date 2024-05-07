import { MetaService } from './../../app/services/metaseo.service';
import { Component } from '@angular/core';
import { NewslistComponent } from '../../components/pages/newslist/newslist.component';
import { ContentfulService } from '../../app/services/contentful.service';
import { environment } from '../../environments/environment';

const CONFIG = environment.contentful_config.contentTypeIds;

@Component({
  selector: 'app-knowledge',
  standalone: true,
  imports: [NewslistComponent],
  templateUrl: './knowledge.component.html'
})
export class KnowledgeComponent {
  news:Array<any> = [];
  limit: number = 10;
  skip: number = 0;
  currentPage: number = 1;

  constructor(private cs:ContentfulService, private meta: MetaService) {}

  ngOnInit(): void {
    this.meta.updateTitle(`Artikel - ${import.meta.env['NG_APP_NAME']}`);
    this.fetchNews();
  }

  async fetchNews() {
    const params = {
      content_type: CONFIG.articles,
    };

    this.cs.getEntries(params).subscribe((news:any[]) => {
      if (news && news.length > 0) {
        const newsPromise = news.map((newse: any) => {
          if (newse.fields && newse.fields.image) {
            const image = newse.fields.image.sys.id;
            return this.cs.getSingleImg(image).then((image: string | undefined) => {
              return {
                ...newse,
                image
              };
            });
          }
          return newse;
        });

        Promise.all(newsPromise).then((newsNew) => {
          this.news = newsNew;
        });
      }
    });
  }

  nextPage() {
    this.skip += this.limit;
    this.currentPage++;
    this.fetchNews();
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
    this.fetchNews();
  }
}
