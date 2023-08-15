import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';

const menu = new MenuTemplate<MainContext>(async (ctx) => {
  const mock = () =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve('Menu Presensi');
      }, 100);
    });
  const data = await mock();

  return data;
});

menu.interact(() => '✅ Lakukan presensi', 'check-in', {
  do: async (ctx, path) => {
    ctx.conversation.enter('presensi-convo');

    return true;
  },
});

menu.manualRow(menuBack);

export default menu;
