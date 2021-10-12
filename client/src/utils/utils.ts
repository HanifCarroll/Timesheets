import axios from 'axios';
import { ApiResponse, Timesheet } from '../types';

const API_URL = 'http://localhost:5000/api/timesheets';

export const dollarFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'})

export const getTimesheets = async () => {
  const { data } = await axios.get<ApiResponse<Timesheet[]>>(API_URL);
  return data.data;
}
