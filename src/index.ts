// Import modul yang diperlukan
import { Bot } from 'grammy';
import { MainContext } from './context';
import initSession from './config/initSession';
import initI18n from './config/initI18n';
import initRouter from './config/initRouter';
import initMenu from './config/initMenu';
import initBot from './config/initBot';
import { mainComposer } from './menu-main';

// Membuat instance bot baru
const bot = new Bot<MainContext>(process.env.BOT_TOKEN!);

// Menggunakan middleware session pada bot
initSession(bot);

// Menggunakan middleware i18n pada bot
initI18n(bot);

// Menggunakan middleware router pada bot
initRouter(bot);

// Menggunakan middleware menu pada bot
initMenu(bot);

// Memulai bot
initBot(bot);

bot.use(mainComposer);
