import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { UseQueryResult } from 'react-query';
import { ApiResponse, Timesheet } from '../../../types';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './styles.scss';

export const TableBody = ({ timesheetsQuery }: { timesheetsQuery: UseQueryResult<ApiResponse<Timesheet[]>, Error> }) => {
  const { data: apiData, isLoading} = timesheetsQuery;
  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);
  const columnDefs: ColDef[] = useMemo(() => [
    { headerName: 'Date', field: 'date' },
    { headerName: 'Client', field: 'client' },
    { headerName: 'Project', field: 'project' },
    { headerName: 'Project Code', field: 'projectCode' },
    { headerName: 'Hours', field: 'hours' },
    { headerName: 'Billable?', field: 'isBillable', valueGetter: params => params.data.isBillable ? 'Y' : 'N' },
    { headerName: 'First Name', field: 'firstName' },
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'Billable Rate', field: 'billableRate' },
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
        rowData={apiData.data}>
      </AgGridReact>
    </div>
  );
}
