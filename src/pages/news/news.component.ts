import { Component, OnInit } from '@angular/core';
import { NewslistComponent } from '../../components/pages/newslist/newslist.component';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { ContentfulService } from '../../app/services/contentful.service';
import { environment } from '../../environments/environment';

const CONFIG = environment.contentful_config.contentTypeIds;

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NewslistComponent, PaginationComponent],
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  news:Array<any> = [];
  constructor(private cs:ContentfulService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  async fetchNews() {
    const params = {
      content_type: CONFIG.news,
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
}
