import { MetaDefinition } from '@angular/platform-browser';

export interface APP_INFO_TYPE {
  appName: string;
  contactEmail: string;
  domain: string;
  url: string;
  docUrl?: string;
  docsUrl: string;
  policyLastUpdate: string;
  github: string;
  twitter: string;
  SEO: { title: string; meta: MetaDefinition[] };
}

export const APP_INFO: APP_INFO_TYPE = {
  appName: 'Stackfusion',
  contactEmail: 'stackfusion@daeeim.com',
  url: 'https://stackfusion.dev',
  docUrl: 'https://docs.stackfusion.dev',
  domain: 'Stackfusion.dev',
  docsUrl: 'https://docs.stackfusion.dev/getting-started/introduction',
  policyLastUpdate: '28 December 2024',
  github: 'https://github.com/Mazen-Embaby/stackfusion-angular-starterkit',
  twitter: 'https://x.com/stackfusio38568',
  SEO: {
    title: 'StackFusion — Angular Full-Stack Starter Kit with Tailwind & CMS',
    meta: [
      {
        name: 'description',
        content:
          'StackFusion is the ultimate Angular starter kit with Tailwind CSS, Angular Material, and backend options like Strapi, Supabase, or Java.',
      },

      {
        name: 'keywords',
        content:
          'Angular starter kit, Tailwind CSS, Angular Material, Strapi CMS, Supabase, Java backend, Java spring, headless CMS, Angular boilerplate, full-stack Angular template, Angular Tailwind admin dashboard',
      },

      // Open Graph
      { property: 'og:title', content: 'StackFusion — Full-Stack Angular Starter Kit' },
      {
        property: 'og:description',
        content:
          'Kickstart your Angular projects with Tailwind CSS, Material UI, and modern backends like Strapi, Supabase, or Java.',
      },
      { property: 'og:image', content: 'https://stackfusion.dev/og-image.jpg' },
      { property: 'og:url', content: 'https://stackfusion.dev/' },
      { property: 'og:type', content: 'website' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'StackFusion — Full-Stack Angular Toolkit' },
      {
        name: 'twitter:description',
        content:
          'Build fast and scalable Angular apps with integrated Tailwind CSS and backends like Strapi and Supabase.',
      },
      { name: 'twitter:image', content: 'https://stackfusion.dev/twitter-preview.jpg' },
    ],
  },
};
