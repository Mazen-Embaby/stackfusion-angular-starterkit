import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  avatars = [
    { relUrl: './assets/img/avatar/photo-1472099645785-5658abf4ff4e.jpg', alt: '' },
    { relUrl: './assets/img/avatar/julian-wan-WNoLnJo7tS8-unsplash.jpg', alt: '' },
    { relUrl: './assets/img/avatar/jake-nackos-IF9TK5Uy-KI-unsplash.jpg', alt: '' },
    { relUrl: './assets/img/avatar/nicolas-horn-MTZTGvDsHFY-unsplash.jpg', alt: '' },
    { relUrl: './assets/img/avatar/alex-suprun-ZHvM3XIOHoE-unsplash.jpg', alt: '' },
  ];
}
