import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
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

  toggleAnswer(index: number): void {
    this.questions[index].open = !this.questions[index].open;
  }
}
