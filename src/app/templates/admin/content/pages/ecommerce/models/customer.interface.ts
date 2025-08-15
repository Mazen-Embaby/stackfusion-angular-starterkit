export interface Customer {
  id?: string | number;
  name: string;
  img?: string;
  email: string;
  phone: string;
  county: string;
  userRole?: 'Administrator' | 'Moderator' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Blocked' | 'Suspended' | 'Deleted';
  lastLogin?: string;
}
