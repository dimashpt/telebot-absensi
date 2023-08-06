import { Bot } from 'grammy';
import { MainContext } from '../context';
import { MenuMiddleware } from 'grammy-inline-menu';
import menu from '../menu-main';

export default function initMenu(bot: Bot<MainContext>): void {
  // Membuat middleware menu baru
  const menuMiddleware = new MenuMiddleware('/', menu);

  // Menambahkan command ke dalam bot
  bot.command('start', (ctx) => {
    menuMiddleware.replyToContext(ctx);
  });

  // Menggunakan middleware menu pada bot
  bot.use(menuMiddleware);
}
