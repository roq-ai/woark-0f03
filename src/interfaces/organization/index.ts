import { ContentInterface } from 'interfaces/content';
import { OnlineFormInterface } from 'interfaces/online-form';
import { SeoOptionInterface } from 'interfaces/seo-option';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  content?: ContentInterface[];
  online_form?: OnlineFormInterface[];
  seo_option?: SeoOptionInterface[];
  user?: UserInterface;
  _count?: {
    content?: number;
    online_form?: number;
    seo_option?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
