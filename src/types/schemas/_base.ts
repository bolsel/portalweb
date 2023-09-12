import { DirectusFile, DirectusUser } from '@directus/sdk';
import { ApiItemsSchema } from './index';

export type TDirectusStatusField = 'draft' | 'published' | 'archive';

export type TDirectusFile = DirectusFile<ApiItemsSchema>;
export type TDirectusUser = DirectusUser<ApiItemsSchema>;
