import { Notification } from './notification.model';

export const NotificationData: Notification[] = [
  {
    id: 1,
    content: `<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
            New message from
            <span class="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All  set  for the presentation?"
            </div>`,
    img: './assets/img/avatar/photo-1472099645785-5658abf4ff4e.jpg',
    date: new Date(),
    link: './',
    isRead: true,
  },

  {
    id: 2,
    content: `<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
            New message from
            <span class="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, "
            </div>`,
    img: './assets/img/avatar/alex-suprun-ZHvM3XIOHoE-unsplash.jpg',
    date: new Date(),
    link: './',
    isRead: false,
  },

  {
    id: 3,
    content: `<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
            and
            <span class="font-medium text-gray-900 dark:text-white">141 others</span>
            love your story. See it and view more stories.
             </div>`,
    img: './assets/img/avatar/alexander-hipp-iEEBWgY_6lA-unsplash.jpg',
    date: new Date(),
    link: './',
    isRead: false,
  },

  {
    id: 4,
    content: `<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span>
            mentioned you in a comment:
            <span class="font-medium text-blue-500" href="#">@bonnie.green</span>
            what do you say?
             </div>`,
    img: './assets/img/avatar/jake-nackos-IF9TK5Uy-KI-unsplash.jpg',
    date: new Date(),
    link: './',
    isRead: false,
  },

  {
    id: 5,
    content: `<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white">Robert Brown</span>
            posted a new video: Glassmorphism - learn how to implement the new
            design trend.
            </div>`,
    img: './assets/img/avatar/julian-wan-WNoLnJo7tS8-unsplash.jpg',
    date: new Date(),
    link: './',
    isRead: true,
  },
];
