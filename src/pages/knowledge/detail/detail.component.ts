import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DisqusModule } from 'ngx-disqus';
import { PipesModule } from '../../../app/pipes/pipes.module';
import { ContentfulService } from '../../../app/services/contentful.service';
import { environment } from '../../../environments/environment';
import { SidenewsComponent } from '../../../components/sidenews/sidenews.component';

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
    private meta: Meta,
    private title: Title
  ) {
    this.fetchData();
  }

  ngOnInit(): void {
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
              this.meta.updateTag({ property: 'og:image', content: `${img}` });
              this.news = {
                ...entry,
                img,
              };
            });
          } else {
            this.news = entry;
          }
          this.title.setTitle(`${entry.fields.title} - Artikel`);
          this.meta.updateTag({ name: 'description', content: `${entry.fields.title}` })
          this.meta.updateTag({ property: 'og:title', content: `${entry.fields.title}` });
          this.meta.updateTag({ property: 'og:description', content: `${entry.fields.title}` });
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
