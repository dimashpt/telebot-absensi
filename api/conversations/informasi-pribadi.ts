import { type Conversation } from '@grammyjs/conversations';
import { MainContext } from '../context';
import { servicePegawai } from '../services';
import { EmployeeDetails } from '../services/models';

type InfoPribadiConversation = Conversation<MainContext>;

enum JK {
  L = 'Laki-laki',
  P = 'Perempuan',
}

async function infoPribadi(
  conversation: InfoPribadiConversation,
  ctx: MainContext,
) {
  let done = false;
  const hasil: Partial<EmployeeDetails> = {};
  const { form } = conversation;

  do {
    // Nama
    await ctx.reply('Masukkan nama lengkap anda:');
    hasil.nama_lengkap = await form.text();

    // Jenis Kelamin
    await ctx.reply('Jenis kelamin anda (L/P):');
    const gender = await form.select(['L', 'P']);
    hasil.jenis_kelamin = JK[gender];

    // Tempat Lahir
    await ctx.reply('Tempat lahir:');
    hasil.tempat_lahir = await form.text();

    // Tanggal Lahir
    await ctx.reply('Tanggal lahir (DD-MM-YYYY):');
    hasil.tanggal_lahir = await form.text();

    // No. Telepon
    await ctx.reply('Nomor telepon:');
    hasil.telepon = await form.text();

    // Agama
    await ctx.reply('Agama:');
    hasil.agama = await form.text();

    // Menikah
    await ctx.reply('Menikah (y/t):');
    const menikah = await form.select(['y', 't']);
    hasil.menikah = menikah === 'y';

    // Alamat
    await ctx.reply('Alamat:');
    hasil.alamat = await form.text();

    // No. KTP
    await ctx.reply('No. KTP:');
    hasil.no_ktp = await form.text();

    // No. NPWP
    await ctx.reply('No. NPWP:');
    hasil.no_npwp = await form.text();

    await ctx.reply(
      ctx.t('info-pribadi', {
        nama_lengkap: hasil.nama_lengkap || '',
        jenis_kelamin: hasil.jenis_kelamin || '',
        tempat_lahir: hasil.tempat_lahir || '',
        tanggal_lahir: hasil.tanggal_lahir || '',
        telepon: hasil.telepon || '',
        agama: hasil.agama || '',
        menikah: (hasil.menikah ? 'Menikah' : 'Belum Menikah') || '',
        alamat: hasil.alamat || '',
        no_ktp: hasil.no_ktp || '',
        no_npwp: hasil.no_npwp || '',
        isi_detail: (hasil.isi_detail ? 'Ya' : 'Tidak') || '',
      }),
    );

    await ctx.reply('Apakah data yang anda masukkan sudah benar? (y/n/c)');
    const confirmation = await form.select(['y', 'n', 'c']);

    if (confirmation === 'c') return;
    done = confirmation === 'y';
  } while (!done);

  await conversation.external(
    async () =>
      await servicePegawai.updateInformasiPribadi(hasil as EmployeeDetails),
  );

  await ctx.reply('Data pribadi berhasil diubah');

  return;
}

export default infoPribadi;
