import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';

const menu = new MenuTemplate<MainContext>(async (ctx) => {
  const mock = () =>
    new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(
          ctx.t('presensi', {
            jam_masuk: ctx.session.settings.jam_kedatangan!,
            jam_pulang: ctx.session.settings.jam_pulang!,
            alamat: ctx.session.settings.alamat_kantor || '',
            radius: ctx.session.settings.radius!.toString(),
          }),
        );
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
