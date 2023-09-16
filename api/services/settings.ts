import { CutiResponse, Employee, Pengaturan } from './models';
import { api } from '../helpers';

export async function getPengaturan(): Promise<Pengaturan> {
  const { data } = await api<Pengaturan>({
    params: {
      action: 'getPengaturan',
    },
  });

  return data;
}
