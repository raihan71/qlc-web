import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../app/pipes/pipes.module';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './faq.component.html',
  styles: [
    `.rotate-180 {transform: rotate(-180deg);}`
  ]
})

export class FaqComponent {
  @Input() title:string = 'Explore Common Questions';
  @Input() followUp:string = 'Still have questions?';
  @Input() callUs:string = 'Contact our support';
  @Input() questions:Array<any> = [
    {
      fields: {
        question: 'How can I get started?',
      },
      answer: 'Getting started is easy! Sign up for an account, and you\'ll have access to our platform\'s features. No credit card required for the initial signup.',
      open: false
    },
  ];

  toggleAnswer(index: number): void {
    this.questions[index].open = !this.questions[index].open;
  }
}
