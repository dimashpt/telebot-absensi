import { Bot } from 'grammy';
import { MainContext } from '../context';
import { conversations, createConversation } from '@grammyjs/conversations';
import infoPribadi from '../conversations/informasi-cuti';

export default function initConversation(bot: Bot<MainContext>): void {
  // Middleware untuk mengelola sesi pada bot
  bot.use(conversations());
  bot.use(createConversation(infoPribadi, 'info-pribadi'));
}
