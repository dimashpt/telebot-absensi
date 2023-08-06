import axios from 'axios';
import { Employee } from '../models';

export async function getEmployee(username: string): Promise<Employee> {
  const { data } = await axios.get<Employee>(process.env.SCRIPT_URL!, {
    params: {
      action: 'getEmployee',
      username,
    },
  });

  return data;
}
