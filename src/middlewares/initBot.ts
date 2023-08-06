import { Bot } from 'grammy';
import { MainContext } from '../context';

export default function initBot(bot: Bot<MainContext>): Bot<MainContext> {
  // Menetapkan command bot
  bot.api.setMyCommands([{ command: 'start', description: 'Buka menu utama' }]);

  // Memulai bot
  bot.start({
    onStart(botInfo) {
      console.log(new Date(), 'Bot starts as', botInfo.username);
    },
  });

  return bot;
}
