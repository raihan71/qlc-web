import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin, from, map, mergeMap, toArray } from 'rxjs';
import { FeatureComponent, CardlistComponent,
  ClientsComponent, FaqComponent
} from '../../components';
import { CarouselComponent } from '../../components/shared/carousel/carousel.component';
import { ContentfulService } from '../../app/services/contentful.service';
import { environment } from '../../environments/environment';

const CONFIG = environment.contentful_config;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ClientsComponent, FeatureComponent, CardlistComponent,
  FaqComponent, CarouselComponent, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  items:Array<any> = [1,2,3];
  galleryOptions:object = {
    loop: true,
    autoplay: false,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    }
  };
  photoOptions:object = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    }
  }
  heros:Array<any> = [];
  galleries:Array<any> = [];
  clients:Array<any> = [];
  features:Array<any> = [];
  programs:Array<any> = [];
  faqs:Array<any> = [];

  constructor(
    private cs: ContentfulService,
  ) {}

  ngOnInit(): void {
    this.fetchHeroes();
    this.fetchGallery();
    this.fetchClient();
    this.fetchFeature();
    this.fetchProduct();
    this.fetchFaq();
  }

  async fetchHeroes() {
    const params = {
      content_type: CONFIG.contentTypeIds.heroCarousel,
    };

    this.cs.getEntries(params).subscribe((heroes:any[]) => {
      if (heroes && heroes.length > 0) {
        const herosPromise = heroes.map((hero: any) => {
          if (hero.fields && hero.fields.image) {
            const img = hero.fields.image.sys.id;
            return this.cs.getSingleImg(img).then((img: string | undefined) => {
              return {
                ...hero,
                img
              };
            });
          }
          return hero;
        });

        Promise.all(herosPromise).then((newHeros) => {
          this.heros = newHeros;
        });
      }
    });
  }

  async fetchGallery() {
    const params = {
      content_type: CONFIG.contentTypeIds.galleryCarousel,
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

  async fetchClient() {
    const params = {
      content_type: CONFIG.contentTypeIds.mitraCarousel,
    };

    this.cs.getEntries(params).subscribe((clients:any[]) => {
      if (clients && clients.length > 0) {
        const clientPromise = clients.map((client: any) => {
          if (client.fields && client.fields.logo) {
            const img = client.fields.logo.sys.id;
            return this.cs.getSingleImg(img).then((img: string | undefined) => {
              return {
                ...client,
                img
              };
            });
          }
          return client;
        });

        Promise.all(clientPromise).then((newClient) => {
          this.clients = newClient;
        });
      }
    });
  }

  async fetchFeature() {
    const params = {
      content_type: CONFIG.contentTypeIds.feature,
    };

    this.cs.getEntries(params).subscribe({
      next:((entries:Array<any>) => {
        this.features = entries.map(entry => {
          return {
            ...entry,
            icon: entry.fields.icon
          };
        });
      })
    });
  }

  async fetchProduct() {
    const params = {
      content_type: CONFIG.contentTypeIds.programs,
      limit: 3
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
          this.programs = newProgram;
        });
      }
    });
  }

  async fetchFaq() {
    const params = {
      content_type: CONFIG.contentTypeIds.faqs,
    };

    this.cs.getEntries(params).subscribe({
      next:((entries:Array<any>) => {
        this.faqs = entries.map(entry => {
          return {
            ...entry,
            answer: entry.fields.answer,
            open: false
          }
        });
      })
    });
  }

}
