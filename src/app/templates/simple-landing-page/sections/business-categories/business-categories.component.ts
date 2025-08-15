import { Component } from '@angular/core';

@Component({
  selector: 'app-business-categories',
  templateUrl: './business-categories.component.html',
  styleUrl: './business-categories.component.scss',
})
export class BusinessCategoriesComponent {
  logos = [
    { src: '/assets/simple-landing-page/images/logo-01.svg', alt: 'Logo 01', width: 32, height: 32 },
    { src: '/assets/simple-landing-page/images/logo-02.svg', alt: 'Logo 02', width: 23, height: 22 },
    { src: '/assets/simple-landing-page/images/logo-03.svg', alt: 'Logo 03', width: 22, height: 22 },
    { src: '/assets/simple-landing-page/images/logo-04.svg', alt: 'Logo 04', width: 24, height: 22 },
    { src: '/assets/simple-landing-page/images/logo-05.svg', alt: 'Logo 05', width: 25, height: 25 },
    { src: '/assets/simple-landing-page/images/logo-06.svg', alt: 'Logo 06', width: 20, height: 18 },
    { src: '/assets/simple-landing-page/images/logo-07.svg', alt: 'Logo 07', width: 25, height: 25 },
    { src: '/assets/simple-landing-page/images/logo-08.svg', alt: 'Logo 08', width: 20, height: 20 },
    { src: '/assets/simple-landing-page/images/logo-09.svg', alt: 'Logo 09', width: 21, height: 13 },
  ];
}
