import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { UseQueryResult } from 'react-query';
import { ApiResponse, Timesheet } from '../../../types';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './styles.scss';
import { BillableHoursCellRenderer } from '../../billable-hours-cell-renderer/BillableHoursCellRenderer';
import { dollarFormatter } from '../../../utils/utils';


export const TableBody = ({ timesheetsQuery }: { timesheetsQuery: UseQueryResult<ApiResponse<Timesheet[]>, Error> }) => {
  const { data: apiData, isLoading} = timesheetsQuery;

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
      valueGetter: params => {
        return params.data.hours.toFixed(2);
      },
      cellStyle: { textAlign: 'right' },
    },
    {
      headerName:'Billable Hours',
      cellRenderer: 'billableHoursCellRenderer',
      type: 'rightAligned',
      valueGetter: params => {
        return params.data.hours.toFixed(2);
      },
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

  if (isLoading || !apiData?.data) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="grid">
      <AgGridReact
        className="ag-theme-alpine"
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        frameworkComponents={frameworkComponents}
        rowData={apiData.data}>
      </AgGridReact>
    </div>
  );
}
