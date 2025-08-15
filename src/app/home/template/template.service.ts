import { Injectable } from '@angular/core';
import { Template } from './template.interface';
import { Observable, of } from 'rxjs';
import { APP_INFO } from '../../app-info';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  templates: Template[] = [
    {
      documentId: '1',
      title: 'Angular Stackfusion Free Admin Dashboard with components', // detailLink can be derived from title with dashes
      description: 'Modern Admin Dashboard include login, signup, etc.',
      screenshotThumbnail: './assets/admin-dashboard/images/screenshot_thumbnail_533*300.jpg',
      imageUrl: './assets/img/showcase/angular%20free%20admin%20dashboard.png',
      detailLink: 'detail/angular-stackfusion-free-admin-dashboard',
      liveLink: 'template/live/admin',
      badge: {
        title: 'Free',
        ngClass: 'bg-green-500 text-white',
      },
      sales: 'FREE',
      price: 'FREE | PRO: $7',
      author: 'Stackfusion',
      downloadLink: APP_INFO.github,
      rating: 4.5,
      reviews: 1,
      tags: [
        'Admin Dashboard',
        'Admin panel',
        'Kanban',
        'Event Management',
        'Ecommerce',
        'CRUD Customers',
        'CRUD Products',
        'Ticket',
        'Mail',
        'AI chat',
        'chat bot',
        'open ai',
      ],
      screenshots: ['./assets/img/showcase/angular%20free%20admin%20dashboard.png'],
      features: [
        'Auth Modular out of box integration',
        'Linting and Prettier Formatting',
        '(i18n) Supports integration',
      ],
    },
    {
      documentId: '2',
      title: 'Angular Stackfusion Free simple-landing-page',
      description: 'Modern Landing boxed page include login, signup, etc.',
      screenshotThumbnail: './assets/simple-landing-page/images/screenshot_thmbnail_300*300.jpg',
      imageUrl: './assets/simple-landing-page/images/screenshot.png',
      detailLink: 'detail/angular-stackfusion-simple-landing-page',
      liveLink: 'template/live/simple-landing-page', //Note: full path
      downloadLink: APP_INFO.github,
      tags: ['Landing page', 'Simple'],
      badge: {
        title: 'Free',
        ngClass: 'bg-green-500 text-white',
      },
      sales: 'FREE',
      price: 'FREE',
      author: 'Stackfusion',
      rating: 4.5,
      reviews: 1,
      features: [
        'Auth Modular out of box integration',
        'Linting and Prettier Formatting',
        '(i18n) Supports integration',
      ],
    },
    {
      documentId: '3',
      title: 'Angular Stackfusion windy-landing-page',
      description: 'Great free Tailwind business website template featuring vivid colors and vector illustrations',
      screenshotThumbnail: './assets/windy-landing/images/screenshot_thumbnail_533*300.jpg',
      imageUrl: './assets/windy-landing/images/screenshot.png',
      detailLink: 'detail/angular-stackfusion-windy-landing-page',
      liveLink: `${APP_INFO.url}/template/live/windy-landing-page`,
      downloadLink: `${APP_INFO.url}/#pricing`,
      tags: ['Landing page', 'Windy'],
      badge: {
        title: 'Starter',
        ngClass: 'bg-green-500 text-white',
      },
      sales: 'FREE',
      price: '$7',
      author: 'Stackfusion',
      rating: 4.5,
      reviews: 1,
      features: [
        'Auth Modular out of box integration',
        'Linting and Prettier Formatting',
        '(i18n) Supports integration',
      ],
    },
    {
      documentId: '4',
      title: 'Angular Stackfusion Sassy Dark',
      description: 'Impressive Tailwind SaaS landing page template with subtle animations and purple accents',
      screenshotThumbnail: './assets/sassy-dark/images/screenshot_tumbnail_533_300.jpg',
      imageUrl: './assets/sassy-dark/images/screenshot.png',
      detailLink: 'detail/angular-stackfusion-sassy-dark',
      liveLink: `${APP_INFO.url}/template/live/sassy-dark`,
      downloadLink: `${APP_INFO.url}/#pricing`,
      tags: ['Landing page', 'sassy', 'dark mode'],
      badge: {
        title: 'Starter',
        ngClass: 'bg-green-500 text-white',
      },
      sales: 'FREE',
      price: '$7',
      author: 'Stackfusion',
      rating: 4.5,
      reviews: 1,
      features: [
        'Auth Modular out of box integration',
        'Linting and Prettier Formatting',
        '(i18n) Supports integration',
      ],
    },
    {
      documentId: '5',
      title: 'Angular Stackfusion X social media clone',
      description: 'Impressive Tailwind SaaS landing page template with subtle animations and purple accents',
      screenshotThumbnail: './assets/twitter/images/screenshot_thumbnail_533*300.jpg',
      imageUrl: './assets/twitter/images/screenshot.png',
      detailLink: 'detail/angular-stackfusion-x',
      liveLink: `${APP_INFO.url}/template/live/twitter`,
      downloadLink: `${APP_INFO.url}/#pricing`,
      badge: {
        title: 'Starter',
        ngClass: 'bg-green-500 text-white',
      },
      sales: 'FREE',
      price: '$7',
      author: 'Stackfusion',
      rating: 4.5,
      reviews: 1,
      tags: ['X clone', 'X', 'Twitter clone', 'Social media'],
      features: [
        'Auth Modular out of box integration',
        'Linting and Prettier Formatting',
        '(i18n) Supports integration',
      ],
    },
  ];

  getTemplates(): Observable<Template[]> {
    return of(this.templates);
  }

  getTemplateByDashTitle(dashTitle: string): Observable<Template | undefined> {
    const found = this.templates.find((t) => t.detailLink.toLowerCase().includes(dashTitle.toLowerCase()));
    return of(found);
  }
}
