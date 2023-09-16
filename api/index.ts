// Import modul yang diperlukan
import 'dotenv/config';
import { Bot, webhookCallback } from 'grammy';
import { MainContext } from './context';
import {
  middlewareAuth,
  middlewareConversation,
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

// Menggunakan middleware conversation pada bot
middlewareConversation(bot);

// Menggunakan middleware menu pada bot
middlewareMenu(bot);

// Menetapkan command bot
bot.api.setMyCommands([
  { command: 'start', description: 'Buka menu utama' },
  { command: 'reset', description: 'Reset bot' },
]);

// Memulai bot
bot.start({
  onStart(botInfo) {
    console.log(new Date(), 'Bot starts as', botInfo.username);
  },
});

export default webhookCallback(bot, 'http');
