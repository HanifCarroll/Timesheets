import {
  useQuery,
  useMutation,
} from 'react-query'
import axios from 'axios';
import { TableHeader } from './table-header/TableHeader';
import { TableBody } from './table-body/TableBody';
import { ApiResponse, Timesheet } from '../../types';

const API_URL = 'http://localhost:5000/api/timesheets';

export const TimesheetTable = () => {
  const getTimesheets = async () => {
    const { data } = await axios.get(API_URL);
    return data;
  }
  const createTimesheet = async () => {
    const timesheet = {
      date: '10/11/21',
      client: 'TEST CLIENT',
      project: 'TEST PROJECT',
      projectCode: 'TESTPROJECTCODE',
      hours: 20,
      isBillable: true,
      firstName: 'Hanif',
      lastName: 'Carroll',
      billableRate: 120,
    };
    const { data } = await axios.post(API_URL, timesheet);
    return data;
  }
  const timesheetsQuery = useQuery<ApiResponse<Timesheet[]>, Error>('timesheets', getTimesheets);
  const timesheetsMutation = useMutation('timesheets', createTimesheet);
  return (
    <>
      <TableHeader timesheetsQuery={timesheetsQuery}/>
      <TableBody timesheetsQuery={timesheetsQuery} />
    </>
  )
}
