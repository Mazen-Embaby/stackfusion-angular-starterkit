export interface Template {
  documentId: string;
  title: string;
  description: string;
  screenshotThumbnail: string;
  imageUrl: string;
  liveLink: string;
  detailLink: string;
  downloadLink: string;
  features?: string[];
  badge?: {
    title: string;
    ngClass: string;
  };
  author?: string;
  sales: string | number;
  rating?: number;
  reviews?: number;
  price?: string | number;
  techStack?: string[];
  tags?: string[];
  screenshots?: string[];
}
