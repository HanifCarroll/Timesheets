import { ICellRendererParams } from 'ag-grid-community';


export const BillableHoursCellRenderer = (props: ICellRendererParams) => {
  const { data } = props;
  let hours = 0;
  let percentage = 0;
  if (data.isBillable) {
    hours = data.hours;
    percentage = 100;
  }

  return (
    <>
      <span className='billable-hours'>{ hours.toFixed(2) }</span>
      <span className='billable-percentage'> ({ percentage }%)</span>
    </>
  );
}
