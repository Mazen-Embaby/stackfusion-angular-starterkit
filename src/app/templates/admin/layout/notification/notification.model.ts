export interface Notification {
  id: string | number;
  img: string;
  content: string;
  link: string;
  isRead: boolean;
  date: Date;
}
