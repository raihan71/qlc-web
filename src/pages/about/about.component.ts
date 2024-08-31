import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqComponent } from '../../components';
import { AboutMeService } from '../../app/services/about-me.service';
import { aboutMe } from '../../app/models/aboutMe';
import { ContentfulService } from '../../app/services/contentful.service';
import { environment } from '../../environments/environment';

const CONFIG = environment.contentful_config.contentTypeIds;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FaqComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  about:aboutMe = {};
  questions:Array<any> = [];
  galleries:Array<any> = [
    {
      fields: {
        title: 'image'
      },
      img1: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png',
      img2: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png'
    }
  ];

  constructor(
    private _aboutMe: AboutMeService,
    private cs: ContentfulService,
    private metaService: Meta,
    private titleService: Title
  ) {
    this.updateMeta();
  }

  updateMeta() {
    this.titleService.setTitle(`Tentang Kami - ${import.meta.env['NG_APP_NAME']}`);
    this.metaService.updateTag({ property: 'og:title', content: `Tentang Kami - ${import.meta.env['NG_APP_NAME']}` });
    this.metaService.updateTag({ property: 'og:image', content: 'https://images.ctfassets.net/6g0kbenqa8m7/4CR7YyKMjU9eMhbHVariKr/ea38fbeef0db0714f199eca08b419e77/qlc-logo/png' });
  }

  ngOnInit(): void {
    this.fetchAboutMe();
    this.fetchGallery();
  }

  async fetchAboutMe() {
    this._aboutMe.getData().subscribe((entry: aboutMe) => {
      this.about = entry;
      this.metaService.updateTag({ name: 'description', content: `${this.about.profile}` });
      this.metaService.updateTag({ property: 'og:description', content: `${this.about.profile}` });
      const { logo } = this.about;
      this.cs.getSingleImg(logo.sys.id).then((image: any) => {
        Object.assign(this.about, { image });
      });
      this.questions = [
        {
          fields: {
            question: 'Visi Kami'
          },
          answer: entry.visi
        },
        {
          fields: {
            question: 'Misi Kami'
          },
          answer: entry.misi
        }
      ];
    });
  }

  async fetchGallery() {
    const params = {
      content_type: CONFIG.galleryCarousel,
      limit: 1
    };

    this.cs.getEntries(params).subscribe((galleries:any[]) => {
      if (galleries && galleries.length > 0) {
        const galleryPromise = galleries.map((gallery: any) => {
          if (gallery.fields && (gallery.fields.image || gallery.fields.image2)) {
            const img1 = gallery.fields.image?.sys.id;
            const img2 = gallery.fields.image2?.sys.id;

            const img1Promise = img1 ? this.cs.getSingleImg(img1) : Promise.resolve(undefined);
            const img2Promise = img2 ? this.cs.getSingleImg(img2) : Promise.resolve(undefined);

            return Promise.all([img1Promise, img2Promise]).then((images: (string | undefined)[]) => {
              const [img1Data, img2Data] = images;

              return {
                ...gallery,
                img1: img1Data,
                img2: img2Data
              };
            });
          }
          return gallery;
        });
        Promise.all(galleryPromise).then((newGallery) => {
          this.galleries = newGallery;
        });
      }
    });
  }
}
