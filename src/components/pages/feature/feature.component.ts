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
    'https://www.youtube.com/embed/rmyuawc2_dU?si=GZJWenBkMr3tsyaW&autoplay=1&mute=0&loop=1&controls=0&modestbranding=0&rel=0&playsinline=1&enablejsapi=1&playlist=ost7_npsZ1Y';
}
