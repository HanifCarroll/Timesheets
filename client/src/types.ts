export interface Timesheet {
  date: Date;
  client: string;
  project: string;
  projectCode: string;
  hours: number;
  isBillable: boolean;
  firstName: string;
  lastName: string;
  billableRate: number;
}

export interface ApiResponse<Type> {
  data: Type;
}
