import { CutiResponse, Employee } from './models';
import { api } from '../helpers';

export async function getCuti(): Promise<CutiResponse> {
  const { data } = await api<CutiResponse>({
    params: {
      action: 'getCutiHistory',
    },
  });

  return data;
}
