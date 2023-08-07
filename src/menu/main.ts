import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import menuPresensi from './presensi';
import menuPengaturan from './settings';
import { SubmenuOptions } from 'grammy-inline-menu/dist/source/buttons/submenu';
import { menuInformation, menuPribadi } from '.';

const joinRow: SubmenuOptions<MainContext> = {
  joinLastRow: true,
};

const mainMenu = new MenuTemplate<MainContext>((ctx) => {
  return ctx.t('main-greetings', {
    name: ctx.from!.first_name,
  });
});

mainMenu.submenu(() => '✅ Presensi', 'presensi', menuPresensi);
mainMenu.submenu(
  () => '👨‍🏫 Informasi Karyawan',
  'informasi-karyawan',
  menuInformation,
);
mainMenu.submenu(
  () => '🙎‍♂️ Informasi Pribadi',
  'informasi-pribadi',
  menuPribadi,
  joinRow,
);
mainMenu.submenu(() => '📝 Riwayat Kehadiran', 'riwayat', menuPresensi);
mainMenu.submenu(() => '❌ Cuti', 'cuti', menuPresensi, joinRow);
mainMenu.submenu(() => '⚙️ Pengaturan', 'pengaturan', menuPengaturan);

export default mainMenu;
