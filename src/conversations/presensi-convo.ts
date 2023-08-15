import { type Conversation } from '@grammyjs/conversations';
import { MainContext } from '../context';
import { servicePresensi } from '../services';
import moment from 'moment';

type PresensiConversation = Conversation<MainContext>;

async function presensiConvo(
  conversation: PresensiConversation,
  ctx: MainContext,
) {
  await ctx.reply('Silakan kirimkan live location anda.');
  let latlong: string = '';

  do {
    const { message } = await conversation.wait();

    if (message?.location?.live_period) {
      latlong = `${message.location.latitude},${message.location.longitude}`;
    } else {
      await ctx.reply('Mohon kirimkan live location anda.');
    }
  } while (!latlong);

  await servicePresensi.presensi(latlong);

  await ctx.reply(
    `Terima kasih, anda berhasil check in pada pukul ${moment().format(
      'HH:mm',
    )}.`,
  );

  return;
}

export default presensiConvo;
