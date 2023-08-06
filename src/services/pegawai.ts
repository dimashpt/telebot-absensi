import axios from 'axios';
import { Employee } from './models';

export async function getEmployee(): Promise<Employee> {
  const { data } = await axios.get<Employee>(process.env.SCRIPT_URL!, {
    params: {
      action: 'getEmployee',
    },
  });

  return data;
}
