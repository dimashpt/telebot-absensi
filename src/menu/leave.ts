import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';

const menu = new MenuTemplate<MainContext>(async (ctx) => {
  return 'Menu Cuti';
});

const subMenu = new MenuTemplate<MainContext>(async (ctx) => {
  return 'Silakan kirimkan pengajuan cuti Anda melalui pesan teks';
});

menu.submenu('📝 Pengajuan Cuti', 'pengajuan-cuti', subMenu);

menu.manualRow(menuBack);
subMenu.manualRow(menuBack);

export default menu;
