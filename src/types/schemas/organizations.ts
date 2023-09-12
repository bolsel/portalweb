import {
  TDirectusFile,
  TDirectusStatusField,
  TDirectusUser,
} from './_base';

export interface OrganizationTypes {
  id: string;
  name: string;
}

export interface OrganizationDocuments {
  id: string;
  status: TDirectusStatusField;
  publish_date: string;
  organization: string | Organizations;
  category: string;
  title: string;
  description?: string;
  slug?: string;
  file: string | TDirectusFile;

  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
}

export interface OrganizationPejabat {
  id: string;
  name: string;
  nip: string;
  jabatan: string;
  organization: string | Organizations;
  image: string | TDirectusFile;
  profil: {
    time: number;
    blocks: JSON;
    version: string;
  };
}

export interface Organizations {
  id: string;
  status: TDirectusStatusField;
  name: string;
  type: string | OrganizationTypes;
  slug: string;

  email: string;
  phone: string;
  address: string;
  location_point: { type: 'Point'; coordinates: [number, number] };
  social_media: { name: string; link: string }[];
  structure: string;
  sekilas: string;
  visi: string;
  misi: string;

  user_created: string | TDirectusUser;
  user_updated: string | TDirectusUser;
  date_updated?: string;
  date_created: string;
}
