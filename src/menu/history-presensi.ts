import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';

const menu = new MenuTemplate<MainContext>((ctx) => {
  return 'Riwayat Kehadiran';
});

menu.manualRow(menuBack);

export default menu;
