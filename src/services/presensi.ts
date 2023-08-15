import { PresensiHistoryResponse, PresensiResponse } from './models';
import { api } from '../helpers';

export async function presensi(coordinate: string): Promise<PresensiResponse> {
  const { data } = await api<PresensiResponse>({
    params: {
      action: 'presensi',
      coordinate,
    },
  });

  return data;
}

export async function getHistoryPresensi(): Promise<PresensiHistoryResponse> {
  const { data } = await api<PresensiHistoryResponse>({
    params: {
      action: 'historyPresensi',
    },
  });

  return data;
}
