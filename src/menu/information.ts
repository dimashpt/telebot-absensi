import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';
import { FluentVariable } from '@grammyjs/i18n/types/src/deps';

const menu = new MenuTemplate<MainContext>((ctx) => {
  const data = ctx.session.user;

  // return 'Hello';
  return ctx.t('info-pribadi', {
    nik: data!.nik as FluentVariable,
    username: data!.username as FluentVariable,
    nama_pegawai: data!.nama_pegawai as FluentVariable,
    jabatan: data!.jabatan as FluentVariable,
    gaji_pokok: data!.gaji_pokok as FluentVariable,
    tunjangan: data!.tunjangan as FluentVariable,
    total_gaji: data!.total_gaji as FluentVariable,
    masa_kerja: data!.masa_kerja as FluentVariable,
    aktif: (data!.aktif ? 'Aktif' : 'Tidak Aktif') as FluentVariable,
  });
});

menu.manualRow(menuBack);

export default menu;
