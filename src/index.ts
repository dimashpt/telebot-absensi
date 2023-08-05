// Import modul yang diperlukan
import { FileAdapter } from "@grammyjs/storage-file";
import { Bot, Context, session, SessionFlavor } from "grammy";
import { MenuTemplate, MenuMiddleware } from 'grammy-inline-menu';
import { intialData as initial, MainContext } from "./context";
import menu from "./menu-main";

// Membuat instance bot baru
const bot = new Bot<MainContext>(process.env.BOT_TOKEN!);

// Middleware untuk mengelola sesi pada bot
bot.use(session({
  initial,
  storage: new FileAdapter()
}));

// // Membuat template menu baru
// const menuTemplate = new MenuTemplate<MainContext>(ctx => `Hai ${ctx.from!.first_name}!`)

// // Menambahkan interaksi ke dalam template menu
// menuTemplate.interact('Text', 'unique', {
//   do: async ctx => {
//     await ctx.answerCallbackQuery('Hooh')
//     return false
//   }
// })

// // Menambahkan interaksi lain ke dalam template menu
// menuTemplate.interact('Text', 'dis', {
//   joinLastRow: true,
//   do: async ctx => {
//     await ctx.answerCallbackQuery('yaay')
//     return false
//   }
// })

// Membuat middleware menu baru
const menuMiddleware = new MenuMiddleware('/', menu);

// Menambahkan command ke dalam bot
bot.command('start', ctx => menuMiddleware.replyToContext(ctx))

// Menggunakan middleware menu pada bot
bot.use(menuMiddleware)

// Menetapkan command bot
bot.api.setMyCommands([
  { command: 'start', description: 'Buka menu utama' },
]);

// Memulai bot
bot.start({
  onStart(botInfo) {
    console.log(new Date(), 'Bot starts as', botInfo.username);
  },
});