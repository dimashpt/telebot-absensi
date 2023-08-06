import { Bot, session } from 'grammy';
import { MainContext, initialData } from '../context';
import { FileAdapter } from '@grammyjs/storage-file';

export default function initSession(bot: Bot<MainContext>): void {
  // Middleware untuk mengelola sesi pada bot
  bot.use(
    session({
      initial: initialData,
      storage: new FileAdapter(),
    }),
  );
}
