import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  limit: number = 9;
  skip: number = 0;
  currentPage: number = 1;

  constructor(private cs:ContentfulService, private meta: Meta, private title: Title) {
    this.updateMeta();
  }

  updateMeta() {
    this.title.setTitle(`Artikel - ${import.meta.env['NG_APP_NAME']}`);
    this.meta.updateTag({ name: 'description', content: `Artikel Terbaru Kami menyajikan artikel-artikel menarik seputar pembahasan ilmu agama.` })
    this.meta.updateTag({ property: 'og:title', content: `Artikel Kami - ${import.meta.env['NG_APP_NAME']}` });
    this.meta.updateTag({ property: 'og:image', content: 'https://images.ctfassets.net/6g0kbenqa8m7/4CR7YyKMjU9eMhbHVariKr/ea38fbeef0db0714f199eca08b419e77/qlc-logo.png' });
    this.meta.updateTag({ property: 'og:description', content: `Artikel Terbaru Kami Menyajikan artikel-artikel menarik seputar pembahasan ilmu agama..` });
  }

  ngOnInit(): void {
    this.fetchNews();
  }

  async fetchNews() {
    const params = {
      content_type: CONFIG.articles,
      limit: this.limit,
      skip: this.skip
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
