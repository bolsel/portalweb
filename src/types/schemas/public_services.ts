import { TDirectusFile, TDirectusUser } from './_base';
import { Organizations } from './organizations';

export interface PublicServicesMedia {
  id: string;
  image: TDirectusFile;
  sort: number;
  public_service: PublicServices;
}
export interface PublicServices {
  id: string;
  status: string;
  sort: number;
  title: string;
  description: string;
  logo?: string | TDirectusFile;
  organization?: string | Organizations;

  type: ('online' | 'offline')[];
  slug: string;
  address: string;
  phones: { number: string; description: string }[];
  email: string;
  links: { name: string; link: string }[];
  operational_hours: { day: number; open: boolean; start: Date; end: Date }[];
  images: string[] | PublicServicesMedia[];
  // images: string[] | TDirectusFile[]
  social_media: { name: string; link: string }[];
  informations: { title: string; item: string[] }[];

  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: Date;
  date_created: Date;
}
