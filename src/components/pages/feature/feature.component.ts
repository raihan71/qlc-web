import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../app/pipes/pipes.module';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './feature.component.html',
  styles: [],
})
export class FeatureComponent {
  @Input() items: Array<any> = [];
  @Input() title: string = '';
  @Input() desc: string = '';
  youTubeUrl: any =
    'https://www.youtube.com/embed/ost7_npsZ1Y?si=GZJWenBkMr3tsyaW?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com';
}
