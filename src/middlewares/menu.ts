import { Bot } from 'grammy';
import { MainContext, initialData } from '../context';
import { MenuMiddleware } from 'grammy-inline-menu';
import menu from '../menu/main';
import { servicePegawai } from '../services';

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

      if (data.error) {
        return ctx.reply(data.message);
      }

      ctx.session.user = data;
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
