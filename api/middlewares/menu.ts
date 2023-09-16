import { Bot } from 'grammy';
import { MainContext, initialData } from '../context';
import { MenuMiddleware } from 'grammy-inline-menu';
import menu from '../menu/main';
import { servicePegawai, serviceSettings } from '../services';

export default function initMenu(bot: Bot<MainContext>): void {
  // Membuat middleware menu baru
  const menuMiddleware = new MenuMiddleware('/', menu);

  // Menambahkan command ke dalam bot
  bot.command('start', async (ctx) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete ctx.session.conversation;

    try {
      const data = await servicePegawai.getEmployee();
      const settings = await serviceSettings.getPengaturan();

      if (data.error) {
        return ctx.reply(data.message);
      }

      delete settings.username_portal;
      delete settings.password_portal;

      ctx.session.user = data;
      ctx.session.settings = settings;
      menuMiddleware.replyToContext(ctx);
    } catch (error) {
      // console.log(error);
      ctx.reply('Ada yang salah, harap coba beberapa saat lagi');
    }
  });

  bot.command('reset', (ctx) => {
    ctx.session = initialData();
  });

  // Menggunakan middleware menu pada bot
  bot.use(menuMiddleware);
}
