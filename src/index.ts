// Import modul yang diperlukan
import { Bot } from 'grammy';
import { MainContext } from './context';
import initSession from './middlewares/initSession';
import initI18n from './middlewares/initI18n';
import initRouter from './middlewares/initRouter';
import initMenu from './middlewares/initMenu';
import initBot from './middlewares/initBot';
import initAccess from './middlewares/initAccess';

// Membuat instance bot baru
const bot = new Bot<MainContext>(process.env.BOT_TOKEN!);

// Menggunakan middleware session pada bot
initSession(bot);

// Menggunakan middleware access pada bot
initAccess(bot);

// Menggunakan middleware i18n pada bot
initI18n(bot);

// Menggunakan middleware router pada bot
initRouter(bot);

// Menggunakan middleware menu pada bot
initMenu(bot);

// Memulai bot
initBot(bot);
