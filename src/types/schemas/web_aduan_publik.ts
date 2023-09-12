import { Websites } from './websites';

export interface WebAduanPublik {
  id: string;
  nama: string;
  email: string;
  hp: string;
  isi: string;
  website: string | Websites;
  date_updated?: string;
  date_created: string;
}
