import { type Conversation } from '@grammyjs/conversations';
import { MainContext } from '../context';

type PresensiConversation = Conversation<MainContext>;

async function presensiConvo(
  conversation: PresensiConversation,
  ctx: MainContext,
) {
  await ctx.reply('Hi there! What is your name?');
  const { message } = await conversation.wait();
  await ctx.reply(`Welcome to the chat, ${message!.text}!`);

  return;
}

export default presensiConvo;
