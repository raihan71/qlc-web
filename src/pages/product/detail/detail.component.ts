import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DisqusModule } from 'ngx-disqus';
import { ContentfulService } from '../../../app/services/contentful.service';
import { ActivatedRoute } from '@angular/router';
import { PipesModule } from '../../../app/pipes/pipes.module';
import { environment } from '../../../environments/environment';
import { MetaService } from '../../../app/services/metaseo.service';

const CONFIG = environment.contentful_config.contentTypeIds;

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, CarouselModule, DisqusModule, PipesModule],
  templateUrl: './detail.component.html',
  styles: [`
  .carousel-item {
      height: 460px; /* Adjust as necessary */
      overflow: hidden; /* Prevent overflow */
  }
  @media (max-width: 767px) {
      .grid-cols-1.md\:grid-cols-2 {
          grid-template-columns: 1fr; /* Single column layout on small screens */
      }
  }
  .rotate-180 {transform: rotate(-180deg);}
  `]
})
export class DetailComponent implements OnInit {
  items:Array<any> = [1,2,3,4];
  product:any = {};
  waMe:string = '//api.whatsapp.com/send?phone=';

  detailOptions:OwlOptions = {
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
  @Input() questions:Array<any> = [
    {
      title: 'How can I get started?',
      answer: 'Getting started is easy! Sign up for an account, and you\'ll have access to our platform\'s features. No credit card required for the initial signup.',
      open: false
    },
    {
      title: 'What is the pricing structure?',
      answer: 'Our pricing structure is flexible. We offer both free and paid plans. You can choose the one that suits your needs and budget.',
      open: false
    },
    {
      title: 'What kind of support do you provide?',
      answer: 'We offer comprehensive customer support. You can reach out to our support team through various channels, including email, chat, and a knowledge base.',
      open: false
    },
    {
      title: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time without any hidden fees. We believe in providing a hassle-free experience for our users.',
      open: false
    }
  ];

  constructor(private cs: ContentfulService, private route:ActivatedRoute, private meta:MetaService) {}

  toggleAnswer(index: number): void {
    this.product.open = !this.product.open;
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchGallery();
  }

  async fetchData() {
    const params = this.route.snapshot.paramMap.get('id');
    this.cs.getEntry(params).subscribe({
      next: ((entry:any) => {
        if (entry) {
          if (entry && entry.image) {
            const img = entry.image.sys.id;
            this.cs.getSingleImg(img).then((img: string | undefined) => {
              this.product = {
                ...entry,
                img,
                open: false
              };
            });
          } else {
            this.product = entry;
          }
          this.meta.updateTitle(`Program - ${entry.name}`);
        }
      })
    });
  }

  async fetchGallery() {
    const params = {
      content_type: CONFIG.galleryCarousel,
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
          this.items = newGallery;
        });
      }
    });
  }
}
