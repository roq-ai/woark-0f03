import axios from 'axios';
import queryString from 'query-string';
import { SeoOptionInterface, SeoOptionGetQueryInterface } from 'interfaces/seo-option';
import { GetQueryInterface } from '../../interfaces';

export const getSeoOptions = async (query?: SeoOptionGetQueryInterface) => {
  const response = await axios.get(`/api/seo-options${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSeoOption = async (seoOption: SeoOptionInterface) => {
  const response = await axios.post('/api/seo-options', seoOption);
  return response.data;
};

export const updateSeoOptionById = async (id: string, seoOption: SeoOptionInterface) => {
  const response = await axios.put(`/api/seo-options/${id}`, seoOption);
  return response.data;
};

export const getSeoOptionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/seo-options/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSeoOptionById = async (id: string) => {
  const response = await axios.delete(`/api/seo-options/${id}`);
  return response.data;
};
