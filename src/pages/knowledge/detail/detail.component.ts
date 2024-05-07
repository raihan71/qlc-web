import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisqusModule } from 'ngx-disqus';
import { PipesModule } from '../../../app/pipes/pipes.module';
import { ContentfulService } from '../../../app/services/contentful.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SidenewsComponent } from '../../../components/sidenews/sidenews.component';
import { MetaService } from '../../../app/services/metaseo.service';

const CONFIG = environment.contentful_config.contentTypeIds;

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [DisqusModule, PipesModule, CommonModule,SidenewsComponent],
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  news:any = {};
  newses:Array<any> = [];

  constructor(
    private cs: ContentfulService,
    private route: ActivatedRoute,
    private meta: MetaService
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.fetchArticles();
  }

  async fetchData() {
    const params = this.route.snapshot.paramMap.get('id');
    this.cs.getPost(params).subscribe({
      next: ((entry:any) => {
        if (entry) {
          if (entry && entry.fields.image) {
            const img = entry.fields.image.sys.id;
            this.cs.getSingleImg(img).then((img: string | undefined) => {
              this.news = {
                ...entry,
                img,
              };
            });
          } else {
            this.news = entry;
          }
          this.meta.updateTitle(`Artikel - ${entry.fields.title}`);
        }
      })
    });
  }

  async fetchArticles() {
    const params = {
      content_type: CONFIG.news,
      limit: 5
    };

    this.cs.getEntries(params).subscribe((articles:any[]) => {
      if (articles && articles.length > 0) {
        const articlePromise = articles.map((article: any) => {
          if (article.fields && article.fields.image) {
            const img = article.fields.image.sys.id;
            return this.cs.getSingleImg(img).then((img: string | undefined) => {
              return {
                ...article,
                img
              };
            });
          }
          return article;
        });

        Promise.all(articlePromise).then((newArticle) => {
          this.newses = newArticle;
        });
      }
    });
  }

}
