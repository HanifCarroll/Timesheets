import { UseQueryResult } from 'react-query';
import { ApiResponse, Timesheet } from '../../../types';
import './styles.scss';
import { dollarFormatter } from '../../../utils/utils';

export const TableHeader = ({ timesheetsQuery }: { timesheetsQuery: UseQueryResult<ApiResponse<Timesheet[]>, Error> }) => {
  const { data: apiData, isLoading} = timesheetsQuery;
  let hours = 0;
  let amount = 0;

  if (apiData?.data) {
    const timesheets = apiData.data;
    hours = timesheets.reduce((acc, timesheet) => acc + timesheet.hours, 0);
    amount = timesheets.reduce((acc, timesheet) => {
      return timesheet.isBillable
        ? acc + (timesheet.hours * timesheet.billableRate)
        : acc;
    }, 0);
  }

  return (<div className='table-header'>
    <div className='table-header-item'>
      <div className="table-header-item-title">
        Hours Tracked
      </div>
      <div className="table-header-item-value">
        { hours.toLocaleString('en-US', { maximumFractionDigits: 2 }) }
      </div>
    </div>
    <div className='table-header-item'>
      <div className="table-header-item-title">
        Billable Amount
      </div>
      <div className="table-header-item-value">
        { dollarFormatter.format(amount) }
      </div>
    </div>
  </div>);
}
