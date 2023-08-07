import { Employee, EmployeeDetails } from './models';
import { api } from '../helpers';

export async function getEmployee(): Promise<Employee> {
  const { data } = await api<Employee>({
    params: {
      action: 'getEmployee',
    },
  });

  return data;
}

export async function getDetails(): Promise<EmployeeDetails> {
  const { data } = await api<EmployeeDetails>({
    params: {
      action: 'getEmployeeDetails',
    },
  });

  return data;
}
