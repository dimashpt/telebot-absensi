import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import menuPresensi from './presensi';
import menuPengaturan from './settings';
import { SubmenuOptions } from 'grammy-inline-menu/dist/source/buttons/submenu';
import { getEmployee } from '../services/pegawai';

const joinRow: SubmenuOptions<MainContext> = {
  joinLastRow: true,
};

const mainMenu = new MenuTemplate<MainContext>((ctx) => {
  return ctx.t('main-greetings', {
    name: ctx.from!.first_name,
  });
});

mainMenu.submenu(() => '✅ Presensi', 'presensi', menuPresensi);
mainMenu.submenu(() => '📝 Riwayat Kehadiran', 'riwayat', menuPresensi);
mainMenu.submenu(() => '❌ Cuti', 'cuti', menuPresensi, joinRow);
mainMenu.interact(() => '🙎‍♂️ Informasi Pribadi', 'informasi', {
  do: async (ctx, path) => {
    try {
      const data = await getEmployee(ctx.from!.username!);

      ctx.reply(
        ctx.t('info-pribadi', {
          nik: data.nik,
          username: data.username,
          nama_pegawai: data.nama_pegawai,
          jabatan: data.jabatan,
          gaji_pokok: data.gaji_pokok,
          tunjangan: data.tunjangan,
          total_gaji: data.total_gaji,
          masa_kerja: data.masa_kerja,
          aktif: data.aktif ? 'Aktif' : 'Tidak Aktif',
        }),
      );

      return '../riwayat';
    } catch (error) {
      console.error(error);
      ctx.reply('Terjadi kesalahan saat mengambil data');

      return false;
    }
  },
});

mainMenu.submenu(() => '⚙️ Pengaturan', 'pengaturan', menuPengaturan, joinRow);

export default mainMenu;
