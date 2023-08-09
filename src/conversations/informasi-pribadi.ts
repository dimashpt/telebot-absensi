import { type Conversation } from '@grammyjs/conversations';
import { MainContext } from '../context';
import moment from 'moment';

type InfoPribadiConversation = Conversation<MainContext>;

async function infoPribadi(
  conversation: InfoPribadiConversation,
  ctx: MainContext,
) {
  let done = false;

  do {
    await ctx.reply(ctx.t('kapan-cuti'));

    const leaveDay = await conversation.form.text();
    const leaveDayDate = moment(leaveDay, 'DD-MM-YYYY');

    await ctx.reply('Berapa hari anda akan cuti?');
    const leaveCount = await conversation.form.number();
    const leaveUntil = moment(leaveDayDate)
      .add(leaveCount, 'days')
      .format('DD-MM-YYYY');

    await ctx.reply(
      `Apa alasan anda mengajukan cuti? (maksimal ${ctx.session.user?.sisa_cuti})`,
    );

    const leaveReason = await conversation.form.text();

    await ctx.reply(
      ctx.t('summary-cuti', {
        tanggal_mulai: leaveDayDate.format('DD-MM-YYYY'),
        tanggal_akhir: leaveUntil,
        jumlah_hari: leaveCount,
        alasan: leaveReason,
      }),
    );

    await ctx.reply('Apakah data diatas sudah benar? (y/n)');

    const confirmation = await conversation.form.text();

    done = confirmation === 'y';
  } while (!done);

  await ctx.reply(
    'Cuti berhasil diajukan! silakan cek di menu cuti secara berkala',
  );

  return;
}

export default infoPribadi;
