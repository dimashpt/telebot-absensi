import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';

const menu = new MenuTemplate<MainContext>((ctx) => 'Menu Presensi');

menu.interact(() => '✅ Check in', 'check-in', {
  do: async (ctx, path) => {
    ctx.conversation.enter('presensi-convo');

    return true;
  },
});

menu.interact(() => '❌ Check out', 'check-out', {
  do: async (ctx, path) => {
    return true;
  },
  joinLastRow: true,
});

menu.manualRow(menuBack);

export default menu;
