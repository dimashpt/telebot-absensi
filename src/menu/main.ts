import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import menuPresensi from './presensi';
import menuPengaturan from './settings';
import { SubmenuOptions } from 'grammy-inline-menu/dist/source/buttons/submenu';
import { menuInformation } from '.';
import { servicePegawai } from '../services';

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
mainMenu.submenu(
  () => '👨‍🏫 Informasi Karyawan',
  'informasi-karyawan',
  menuInformation,
);
mainMenu.interact(() => '🙎‍♂️ Informasi Pribadi', 'informasi-pribadi', {
  ...joinRow,
  do: async (ctx, path) => {
    try {
      const data = await servicePegawai.getDetails();

      ctx.reply(
        ctx.t('info-pribadi', {
          nama_lengkap: data.nama_lengkap || '',
          jenis_kelamin: data.jenis_kelamin || '',
          tempat_lahir: data.tempat_lahir || '',
          tanggal_lahir: data.tanggal_lahir || '',
          telepon: data.telepon || '',
          agama: data.agama || '',
          menikah: (data.menikah ? 'Menikah' : 'Belum Menikah') || '',
          alamat: data.alamat || '',
          no_ktp: data.no_ktp || '',
          no_npwp: data.no_npwp || '',
          isi_detail: (data.isi_detail ? 'Ya' : 'Tidak') || '',
        }),
      );

      return true;
    } catch (error) {
      console.error(error);
      ctx.reply('Terjadi kesalahan saat mengambil data');

      return false;
    }
  },
});

mainMenu.submenu(() => '🔄 Refresh Data', 'refresh', menuPengaturan);
mainMenu.submenu(() => '⚙️ Pengaturan', 'pengaturan', menuPengaturan, joinRow);

export default mainMenu;
