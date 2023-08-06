import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';

const menu = new MenuTemplate<MainContext>((ctx) => 'Menu Settings');

menu.interact(() => 'Rumah', 'rumah', {
  do: async (ctx, path) => {
    const data = await fetch(
      'https://64ccda982eafdcdc851a5f76.mockapi.io/users',
    );

    console.log(path);

    return '/presensi';
  },
});

menu.manualRow(menuBack);

export default menu;
