import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { APP_INFO } from '../../../../app-info';

interface thumbnail {
  title: string;
  link: string;
  svgPath: string;
}
@Component({
  selector: 'app-comps',
  imports: [SvgIconComponent],
  templateUrl: './comps-page.html',
  styleUrls: ['./comps-page.scss'],
})
export class CompsPage {
  rectColor = 'red';
  readonly info = APP_INFO;

  comps: thumbnail[] = [
    {
      title: 'Accordion',
      svgPath: 'assets/img/component-thumnail/accordion.svg',
      link: `${this.info.docUrl}/components/accordion`,
    },
    {
      title: 'Alert',
      svgPath: 'assets/img/component-thumnail/alerts.svg',
      link: `${this.info.docUrl}/components/alerts`,
    },
    {
      title: 'Avatar',
      svgPath: 'assets/img/component-thumnail/avatar.svg',
      link: `${this.info.docUrl}/components/avatar`,
    },
    {
      title: 'Badge',
      svgPath: 'assets/img/component-thumnail/badge.svg',
      link: `${this.info.docUrl}/components/badge`,
    },
    {
      title: 'Banner',
      svgPath: 'assets/img/component-thumnail/banner.svg',
      link: `${this.info.docUrl}/components/banner`,
    },
    {
      title: 'Bottom Navigation',
      svgPath: 'assets/img/component-thumnail/bottom_navigation.svg',
      link: `${this.info.docUrl}/components/bottom_navigation`,
    },
    {
      title: 'Breadcrumb',
      svgPath: 'assets/img/component-thumnail/breadcrumb.svg',
      link: `${this.info.docUrl}/components/breadcrumb`,
    },
    {
      title: 'Buttons',
      svgPath: 'assets/img/component-thumnail/buttons.svg',
      link: `${this.info.docUrl}/components/buttons`,
    },
    {
      title: 'Button Group',
      svgPath: 'assets/img/component-thumnail/button-group.svg',
      link: `${this.info.docUrl}/components/button-group`,
    },
    {
      title: 'Card',
      svgPath: 'assets/img/component-thumnail/card.svg',
      link: `${this.info.docUrl}/components/card`,
    },
    {
      title: 'Carousel',
      svgPath: 'assets/img/component-thumnail/carousel.svg',
      link: `${this.info.docUrl}/components/carousel`,
    },
    {
      title: 'Chat Bubble',
      svgPath: 'assets/img/component-thumnail/chat-bubble.svg',
      link: `${this.info.docUrl}/components/chat-bubble`,
    },
    {
      title: 'Clipboard',
      svgPath: 'assets/img/component-thumnail/clipboard.svg',
      link: `${this.info.docUrl}/components/clipboard`,
    },
    {
      title: 'Datepicker',
      svgPath: 'assets/img/component-thumnail/datepicker.svg',
      link: `${this.info.docUrl}/components/datepicker`,
    },
    {
      title: 'Device Mockups',
      svgPath: 'assets/img/component-thumnail/device-mockups.svg',
      link: `${this.info.docUrl}/components/device-mockups`,
    },
    {
      title: 'Drawer',
      svgPath: 'assets/img/component-thumnail/drawer.svg',
      link: `${this.info.docUrl}/components/drawer`,
    },
    {
      title: 'Dropdowns',
      svgPath: 'assets/img/component-thumnail/dropdowns.svg',
      link: `${this.info.docUrl}/components/dropdowns`,
    },
    {
      title: 'Footer',
      svgPath: 'assets/img/component-thumnail/footer.svg',
      link: `${this.info.docUrl}/components/footer`,
    },
    {
      title: 'Forms',
      svgPath: 'assets/img/component-thumnail/forms.svg',
      link: `${this.info.docUrl}/components/forms`,
    },
    {
      title: 'Gallery',
      svgPath: 'assets/img/component-thumnail/gallery.svg',
      link: `${this.info.docUrl}/components/gallery`,
    },
    {
      title: 'Indicators',
      svgPath: 'assets/img/component-thumnail/indicators.svg',
      link: `${this.info.docUrl}/components/indicators`,
    },
    {
      title: 'Jumbotron',
      svgPath: 'assets/img/component-thumnail/jumbotron.svg',
      link: `${this.info.docUrl}/components/jumbotron`,
    },
    {
      title: 'KBD',
      svgPath: 'assets/img/component-thumnail/kbd.svg',
      link: `${this.info.docUrl}/components/kbd`,
    },
    {
      title: 'List Group',
      svgPath: 'assets/img/component-thumnail/list-group.svg',
      link: `${this.info.docUrl}/components/list-group`,
    },
    {
      title: 'Mega Menu',
      svgPath: 'assets/img/component-thumnail/mega-menu.svg',
      link: `${this.info.docUrl}/components/mega-menu`,
    },
    {
      title: 'Modal',
      svgPath: 'assets/img/component-thumnail/modal.svg',
      link: `${this.info.docUrl}/components/modal`,
    },
    {
      title: 'Navbar',
      svgPath: 'assets/img/component-thumnail/navbar.svg',
      link: `${this.info.docUrl}/components/navbar`,
    },
    {
      title: 'Pagination',
      svgPath: 'assets/img/component-thumnail/pagination.svg',
      link: `${this.info.docUrl}/components/pagination`,
    },
    {
      title: 'Popover',
      svgPath: 'assets/img/component-thumnail/popover.svg',
      link: `${this.info.docUrl}/components/popover`,
    },
    {
      title: 'Progress',
      svgPath: 'assets/img/component-thumnail/progress.svg',
      link: `${this.info.docUrl}/components/progress`,
    },
    {
      title: 'Rating',
      svgPath: 'assets/img/component-thumnail/rating.svg',
      link: `${this.info.docUrl}/components/rating`,
    },
    {
      title: 'Sidebar',
      svgPath: 'assets/img/component-thumnail/sidebar.svg',
      link: `${this.info.docUrl}/components/sidebar`,
    },
    {
      title: 'Skeleton',
      svgPath: 'assets/img/component-thumnail/skeleton.svg',
      link: `${this.info.docUrl}/components/skeleton`,
    },
    {
      title: 'Speed Dial',
      svgPath: 'assets/img/component-thumnail/speed-dial.svg',
      link: `${this.info.docUrl}/components/speed-dial`,
    },
    {
      title: 'Spinner',
      svgPath: 'assets/img/component-thumnail/spinner.svg',
      link: `${this.info.docUrl}/components/spinner`,
    },
    {
      title: 'Stepper',
      svgPath: 'assets/img/component-thumnail/stepper.svg',
      link: `${this.info.docUrl}/components/stepper`,
    },
    {
      title: 'Tables',
      svgPath: 'assets/img/component-thumnail/tables.svg',
      link: `${this.info.docUrl}/components/tables`,
    },
    {
      title: 'Tabs',
      svgPath: 'assets/img/component-thumnail/tabs.svg',
      link: `${this.info.docUrl}/components/tabs`,
    },
    {
      title: 'Timeline',
      svgPath: 'assets/img/component-thumnail/timeline.svg',
      link: `${this.info.docUrl}/components/timeline`,
    },
    {
      title: 'Toast',
      svgPath: 'assets/img/component-thumnail/toast.svg',
      link: `${this.info.docUrl}/components/toast`,
    },
    {
      title: 'Tooltips',
      svgPath: 'assets/img/component-thumnail/tooltips.svg',
      link: `${this.info.docUrl}/components/tooltips`,
    },
    {
      title: 'Typography',
      svgPath: 'assets/img/component-thumnail/typography.svg',
      link: `${this.info.docUrl}/components/typography`,
    },
    {
      title: 'Video',
      svgPath: 'assets/img/component-thumnail/video.svg',
      link: `${this.info.docUrl}/components/video`,
    },

    // {
    //   title: 'Advanced Range Slider',
    //   svgPath: 'assets/img/component-thumnail/advanced_range_slider.svg',
    //   link: `${this.info.docUrl}/components/accordion',
    // },
    // {
    //   title: 'Advanced Select',
    //   svgPath: 'assets/img/component-thumnail/advanced_select.svg',
    //   link: `${this.info.docUrl}/components/accordion',
    // },

    // {
    //   title: 'Animation',
    //   svgPath: 'assets/img/component-thumnail/animation.svg',
    //   link: `${this.info.docUrl}/components/accordion',
    // }
  ];
}
