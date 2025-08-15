import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features-planet',
  imports: [MatIconModule],
  templateUrl: './features-planet.component.html',
  styleUrl: './features-planet.component.scss',
})
export class FeaturesPlanetComponent {
  planetImg = 'assets/simple-landing-page/images/planet.png'; // Replace with actual image path
  planetOverlayImg = 'assets/simple-landing-page/images/planet-overlay.svg';
  planetTagImg01 = 'assets/simple-landing-page/images/planet-tag-01.png';
  planetTagImg02 = 'assets/simple-landing-page/images/planet-tag-02.png';
  planetTagImg03 = 'assets/simple-landing-page/images/planet-tag-03.png';
  planetTagImg04 = 'assets/simple-landing-page/images/planet-tag-04.png';

  features = [
    {
      title: 'Instant Analytics',
      description:
        'Collect essential insights about how visitors are using your site with in-depth page view metrics like pages, referring sites, and more.',
      matIcon: 'monitoring',
    },
    {
      title: 'Metadata',
      description:
        'Collect essential insights about how visitors are using your site with in-depth page view metrics like pages, referring sites, and more.',
      matIcon: 'home',
    },
    {
      title: 'SEO & Performance',
      description:
        'Collect essential insights about how visitors are using your site with in-depth page view metrics like pages, referring sites, and more.',
      matIcon: 'travel_explore',
    },
    {
      title: 'Custom Code',
      description:
        'Collect essential insights about how visitors are using your site with in-depth page view metrics like pages, referring sites, and more.',
      matIcon: 'code',
    },
    {
      title: 'Localization',
      description:
        'Collect essential insights about how visitors are using your site with in-depth page view metrics like pages, referring sites, and more.',
      matIcon: 'translate',
    },
    {
      title: 'Canonical URL',
      description:
        'Collect essential insights about how visitors are using your site with in-depth page view metrics like pages, referring sites, and more.',
      matIcon: 'link',
    },
  ];
}
