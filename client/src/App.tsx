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
    <QueryClientProvider client={queryClient}>
      <TimesheetTable />
    </QueryClientProvider>
  );
}

export default App;
