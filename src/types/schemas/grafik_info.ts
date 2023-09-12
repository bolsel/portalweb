import { TDirectusFile, TDirectusUser } from './_base';

export interface GrafikInfo {
  id: string;
  status: string;
  title: string;
  image: string | TDirectusFile;
  publish_date: string;
  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
}
