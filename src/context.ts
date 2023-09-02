import type { Context, SessionFlavor } from 'grammy';
import { I18nFlavor } from '@grammyjs/i18n';
import { CutiResponse, Employee, Pengaturan } from './services/models';
import { ConversationFlavor } from '@grammyjs/conversations';

export type SessionData = {
  page?: number;
  step?: string;
  user?: Partial<Employee>;
  cuti?: Partial<CutiResponse>;
  settings: Partial<Pengaturan>;
};

export function initialData(): SessionData {
  return {
    page: 0,
    step: '/',
    user: {
      aktif: false,
      gaji: 0,
      masa_kerja: '',
      jabatan: '',
      nama_pegawai: '',
      nip: '',
      username: '',
      sisa_cuti: 0,
    },
    cuti: {},
    settings: {},
  };
}

export type MainContext = Context &
  SessionFlavor<SessionData> &
  I18nFlavor &
  ConversationFlavor;
