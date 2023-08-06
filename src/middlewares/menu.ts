import { Bot } from 'grammy';
import { MainContext } from '../context';
import { MenuMiddleware } from 'grammy-inline-menu';
import menu from '../menu/main';
import { servicePegawai } from '../services';

export default function initMenu(bot: Bot<MainContext>): void {
  // Membuat middleware menu baru
  const menuMiddleware = new MenuMiddleware('/', menu);

  // Menambahkan command ke dalam bot
  bot.command('start', async (ctx) => {
    try {
      const data = await servicePegawai.getEmployee(ctx.from!.username!);

      if (data?.aktif) {
        menuMiddleware.replyToContext(ctx);
      } else {
        throw new Error();
      }
    } catch (error) {
      // console.error(error);
      ctx.reply('Anda tidak memiliki akses ke bot ini');
    }
  });

  // Menggunakan middleware menu pada bot
  bot.use(menuMiddleware);
}
