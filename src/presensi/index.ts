import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { backButtons } from '../menu-general';

const menu = new MenuTemplate<MainContext>((ctx) => 'Menu Presensi');

menu.manualRow(backButtons);

export default menu;
