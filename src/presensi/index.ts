import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { backButtons } from '../menu-general';
import { Router } from '@grammyjs/router';

const menu = new MenuTemplate<MainContext>((ctx) => 'Menu Presensi');

menu.manualRow(backButtons);

export default menu;
