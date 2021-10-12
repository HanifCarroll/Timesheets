import { useQuery } from 'react-query'
import { TableHeader } from './table-header/TableHeader';
import { TableBody } from './table-body/TableBody';
import { Timesheet } from '../../types';
import { getTimesheets } from '../../utils/utils';

export const TimesheetTable = () => {
  const timesheetsQuery = useQuery<Timesheet[], Error>('timesheets', getTimesheets);

  return (
    <>
      <TableHeader timesheetsQuery={timesheetsQuery}/>
      <TableBody timesheetsQuery={timesheetsQuery} />
    </>
  )
}
