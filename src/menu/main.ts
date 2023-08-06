import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import menuPresensi from './presensi';
import menuPengaturan from './settings';
import { SubmenuOptions } from 'grammy-inline-menu/dist/source/buttons/submenu';
import { getEmployee } from '../services/pegawai';
import { menuInformation } from '.';

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
mainMenu.submenu(() => '🙎‍♂️ Informasi Pribadi', 'informasi', menuInformation);

mainMenu.submenu(() => '⚙️ Pengaturan', 'pengaturan', menuPengaturan, joinRow);

export default mainMenu;
