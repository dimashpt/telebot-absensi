import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.start((context) => context.reply('Welcome'));
bot.help((context) => context.reply('Send me a sticker'));
bot.on(message('sticker'), (context) => context.reply('👍'));
bot.hears('hi', (context) => context.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));