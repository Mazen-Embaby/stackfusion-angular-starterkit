import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { BusinessCategoriesComponent } from './sections/business-categories/business-categories.component';
import { FeaturesPlanetComponent } from './sections/features-planet/features-planet.component';
import { LargeTestimonialComponent } from './sections/large-testimonial/large-testimonial.component';
import { CtaComponent } from './sections/cta/cta.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    BusinessCategoriesComponent,
    FeaturesPlanetComponent,
    LargeTestimonialComponent,
    CtaComponent,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
