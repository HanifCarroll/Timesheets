import { UseQueryResult } from 'react-query';
import { Timesheet } from '../../../types';
import { dollarFormatter } from '../../../utils/utils';
import './styles.scss';

export const TableHeader = ({ timesheetsQuery }: { timesheetsQuery: UseQueryResult<Timesheet[], Error> }) => {
  const { data: timesheets } = timesheetsQuery;
  let hours = 0;
  let amount = 0;

  if (timesheets) {
    hours = timesheets.reduce((acc, timesheet) => acc + timesheet.hours, 0);
    amount = timesheets.reduce((acc, timesheet) => {
      return timesheet.isBillable
        ? acc + (timesheet.hours * timesheet.billableRate)
        : acc;
    }, 0);
  }

  return (
    <div className='table-header'>
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
    </div>
  );
}
