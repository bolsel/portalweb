import {
  TDirectusFile,
  TDirectusStatusField,
  TDirectusUser,
} from './_base';

export interface BannerInfo {
  id: string;
  status: TDirectusStatusField;
  title: string;
  sort: number;
  image: string | TDirectusFile;
  link?: string;
  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
}
