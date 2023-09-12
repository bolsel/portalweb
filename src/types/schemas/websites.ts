import { TDirectusStatusField, TDirectusUser } from './_base';
import { Organizations } from './organizations';

export interface Websites {
  id: string;
  status: TDirectusStatusField;
  sort: number;
  name: string;
  slug: string;
  domain: string;
  subdomain: string;
  domain_alias?: string;
  organization: string | Organizations;
  modules?: string[];

  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
}
