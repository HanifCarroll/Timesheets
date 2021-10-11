import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css';
import { TimesheetTable } from './components/table/TimesheetTable';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='container'>
      <QueryClientProvider client={queryClient}>
        <TimesheetTable />
      </QueryClientProvider>
    </div>
  );
}

export default App;
