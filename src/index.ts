// Import modul yang diperlukan
import { FileAdapter } from '@grammyjs/storage-file';
import { Bot, session } from 'grammy';
import { MenuMiddleware } from 'grammy-inline-menu';
import { intialData as initial, MainContext } from './context';
import menu from './menu-main';
import { I18n } from '@grammyjs/i18n';

// Membuat instance bot baru
const bot = new Bot<MainContext>(process.env.BOT_TOKEN!);

// Middleware untuk mengelola sesi pada bot
bot.use(
  session({
    initial,
    storage: new FileAdapter(),
  }),
);

// Buat sebuah instance `I18n`.
// Lanjutkan membaca untuk mengetahui bagaimana cara mengatur instance ini.
const i18n = new I18n<MainContext>({
  defaultLocale: 'id', // Lihat di bawah untuk informasi lebih lanjut.
  directory: 'locales', // Muat semua file terjemahan dari locales/.
});

bot.use(i18n);

// Membuat middleware menu baru
const menuMiddleware = new MenuMiddleware('/', menu);

// Menambahkan command ke dalam bot
bot.command('start', (ctx) => menuMiddleware.replyToContext(ctx));

// Menggunakan middleware menu pada bot
bot.use(menuMiddleware);

// Menetapkan command bot
bot.api.setMyCommands([{ command: 'start', description: 'Buka menu utama' }]);

// Memulai bot
bot.start({
  onStart(botInfo) {
    console.log(new Date(), 'Bot starts as', botInfo.username);
  },
});
