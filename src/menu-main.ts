import { MenuTemplate, getMenuOfPath } from 'grammy-inline-menu';
import { MainContext } from './context';
import menuPresensi from './presensi';
import menuPengaturan from './pengaturan';
import { Composer } from 'grammy';
import { SubmenuOptions } from 'grammy-inline-menu/dist/source/buttons/submenu';
import axios from 'axios';
import { Employee } from './models';

export const mainComposer = new Composer<MainContext>();
const joinRow: SubmenuOptions<MainContext> = {
  joinLastRow: true,
};

const menu = new MenuTemplate<MainContext>((ctx) => {
  return ctx.t('main-greetings', {
    name: ctx.from!.first_name,
  });
});

menu.submenu(() => '✅ Presensi', 'presensi', menuPresensi);
menu.submenu(() => '📝 Riwayat Kehadiran', 'riwayat', menuPresensi);
menu.submenu(() => '❌ Cuti', 'cuti', menuPresensi, joinRow);
// menu.submenu(() => '🙎‍♂️ Informasi Pribadi', 'informasi', menuPresensi);
menu.interact(() => '🙎‍♂️ Informasi Pribadi', 'informasi', {
  do: async (ctx, path) => {
    try {
      const { data } = await axios.get<Employee>(process.env.SCRIPT_URL!, {
        params: {
          action: 'getEmployee',
          username: ctx.from!.username,
        },
      });

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
menu.submenu(() => '⚙️ Pengaturan', 'pengaturan', menuPengaturan, joinRow);

export default menu;
