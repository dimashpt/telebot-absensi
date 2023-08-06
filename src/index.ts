// Import modul yang diperlukan
import { Bot } from 'grammy';
import { MainContext } from './context';
import {
  middlewareAuth,
  middlewareI18n,
  middlewareMenu,
  middlewareRouter,
  middlewareSession,
} from './middlewares';

// Membuat instance bot baru
const bot = new Bot<MainContext>(process.env.BOT_TOKEN!);

// Menggunakan middleware session pada bot
middlewareSession(bot);

// Menggunakan middleware access pada bot
middlewareAuth(bot);

// Menggunakan middleware i18n pada bot
middlewareI18n(bot);

// Menggunakan middleware router pada bot
middlewareRouter(bot);

// Menggunakan middleware menu pada bot
middlewareMenu(bot);

// Menetapkan command bot
bot.api.setMyCommands([{ command: 'start', description: 'Buka menu utama' }]);

// Memulai bot
bot.start({
  onStart(botInfo) {
    console.log(new Date(), 'Bot starts as', botInfo.username);
  },
});
