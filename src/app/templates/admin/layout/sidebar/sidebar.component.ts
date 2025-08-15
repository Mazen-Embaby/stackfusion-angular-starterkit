import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

interface MenuItem {
  id: any;
  name: string;
  link?: string;
  icon: string;
  isOpen?: boolean;
  children: MenuItem[];
  target?: '_blank' | '_parent' | '_self' | '_top';
}

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  private _sideBarService = inject(SidebarService);

  @ViewChild('sideBarDrawer', { static: false }) sideBarDrawer!: ElementRef;

  navigationMenu: MenuItem[] = [
    {
      id: 1,
      name: 'DASHBOARD',
      icon: 'dashboard',
      isOpen: true,
      target: '_self',
      children: [
        {
          id: 11,
          name: 'Inventory',
          link: 'dashboard/b',
          icon: 'analytics',
          target: '_self',
          children: [],
        },
        // {
        //   id: 12,
        //   name: 'Finance',
        //   link: 'dashboard',
        //   icon: 'speed',
        //   target: '_self',
        //   children: [],
        // },
      ],
    },

    {
      id: 2,
      name: 'APPS',
      icon: 'apps',
      isOpen: true,
      target: '_self',
      children: [
        {
          id: 20,
          name: 'Kanban',
          link: 'app/kanban',
          icon: 'view_kanban',
          target: '_self',
          children: [],
        },
        {
          id: 21,
          name: 'Event',
          link: 'app/event',
          icon: 'event',
          target: '_self',
          children: [],
        },
        {
          id: 22,
          name: 'AI Chat',
          link: 'app/chat',
          icon: 'chat',
          target: '_self',
          children: [],
        },
        {
          id: 23,
          name: 'Ecommerce',
          link: 'app/ecommerce',
          icon: 'shopping_cart',
          target: '_self',
          children: [
            {
              id: 230,
              name: 'Products',
              link: 'app/ecommerce',
              icon: 'shopping_bag',
              target: '_self',
              children: [],
            },
            {
              id: 231,
              name: 'Customers',
              link: 'app/ecommerce/customers',
              icon: 'group',
              target: '_self',
              children: [],
            },
          ],
        },
        {
          id: 24,
          name: 'Ticket',
          link: 'app/ticket',
          icon: 'support_agent',
          target: '_self',
          children: [],
        },
        {
          id: 25,
          name: 'Mail',
          link: 'app/mail',
          icon: 'mail',
          target: '_self',
          children: [],
        },
      ],
    },

    {
      id: 3,
      name: 'PAGES',
      icon: 'description',
      isOpen: true,
      target: '_self',
      children: [
        {
          id: 30,
          name: 'SIGN-IN',
          link: '#',
          icon: 'login',
          target: '_self',
          children: [
            {
              id: 300,
              name: 'Simple',
              link: '/pages/sign-in/simple',
              icon: 'login',
              target: '_blank',
              children: [],
            },
          ],
        },
      ],
    },

    {
      id: 4,
      name: 'SECTIONS',
      icon: 'view_quilt',
      isOpen: false,
      target: '_self',
      children: [],
    },

    {
      id: 5,
      name: 'COMPONENTS',
      link: 'comp',
      icon: 'group_work',
      isOpen: true,
      target: '_self',
      children: [],
    },
  ];

  ngAfterViewInit(): void {
    this._sideBarService.setTargetElement(this.sideBarDrawer);
  }
}
