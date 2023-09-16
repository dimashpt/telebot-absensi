import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';
import { servicePegawai } from '../services';

const menu = new MenuTemplate<MainContext>(async (ctx) => {
  try {
    const data = await servicePegawai.getDetails();

    return ctx.t('info-pribadi', {
      nama_lengkap: data.nama_lengkap || '',
      jenis_kelamin: data.jenis_kelamin || '',
      tempat_lahir: data.tempat_lahir || '',
      tanggal_lahir: data.tanggal_lahir || '',
      telepon: data.telepon || '',
      agama: data.agama || '',
      menikah: (data.menikah ? 'Menikah' : 'Belum Menikah') || '',
      alamat: data.alamat || '',
      no_ktp: data.no_ktp || '',
      no_npwp: data.no_npwp || '',
      isi_detail: (data.isi_detail ? 'Ya' : 'Tidak') || '',
    });
  } catch (error) {
    console.error(error);
    ctx.reply('Terjadi kesalahan saat mengambil data');

    return 'Something went wrong';
  }
});

menu.interact('✍️ Ubah Informasi', 'ubah-informasi', {
  do: async (ctx) => {
    ctx.conversation.enter('info-pribadi');

    return true;
  },
});

menu.manualRow(menuBack);

export default menu;
