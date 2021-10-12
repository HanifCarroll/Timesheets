import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { UseQueryResult } from 'react-query';
import { Timesheet } from '../../../types';
import { BillableHoursCellRenderer } from '../../billable-hours-cell-renderer/BillableHoursCellRenderer';
import { dollarFormatter } from '../../../utils/utils';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './styles.scss';


export const TableBody = ({ timesheetsQuery }: { timesheetsQuery: UseQueryResult<Timesheet[], Error> }) => {
  const { data: timesheets, isLoading, isLoadingError } = timesheetsQuery;

  const frameworkComponents = {
    'billableHoursCellRenderer': BillableHoursCellRenderer,
  };
  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);
  const columnDefs: ColDef[] = useMemo(() => [
    {
      headerName: 'Name',
      field: 'project',
      cellClass: 'blue-text',
    },
    {
      headerName:'Client',
      field: 'client',
      cellClass: 'blue-text',
    },
    {
      headerName: 'Hours',
      field: 'hours',
      cellClass: 'blue-text',
      type: 'rightAligned',
      valueGetter: params => params.data.hours.toFixed(2),
      cellStyle: { textAlign: 'right' },
    },
    {
      headerName:'Billable Hours',
      cellRenderer: 'billableHoursCellRenderer',
      type: 'rightAligned',
    },
    {
      headerName: 'Billable Amount',
      type: 'rightAligned',
      width: 180,
      valueGetter: params => {
        const { isBillable, hours, billableRate } = params.data;
        return isBillable
          ? dollarFormatter.format(billableRate * hours)
          : '-';
      }
    },
  ], []);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isLoadingError) {
    return <h2>An error occurred.</h2>
  }

  return (
    <div className="grid">
      <AgGridReact
        className="ag-theme-alpine"
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        frameworkComponents={frameworkComponents}
        rowData={timesheets}>
      </AgGridReact>
    </div>
  );
}
