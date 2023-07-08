import axios from 'axios';
import queryString from 'query-string';
import { OnlineFormInterface, OnlineFormGetQueryInterface } from 'interfaces/online-form';
import { GetQueryInterface } from '../../interfaces';

export const getOnlineForms = async (query?: OnlineFormGetQueryInterface) => {
  const response = await axios.get(`/api/online-forms${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOnlineForm = async (onlineForm: OnlineFormInterface) => {
  const response = await axios.post('/api/online-forms', onlineForm);
  return response.data;
};

export const updateOnlineFormById = async (id: string, onlineForm: OnlineFormInterface) => {
  const response = await axios.put(`/api/online-forms/${id}`, onlineForm);
  return response.data;
};

export const getOnlineFormById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/online-forms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOnlineFormById = async (id: string) => {
  const response = await axios.delete(`/api/online-forms/${id}`);
  return response.data;
};
