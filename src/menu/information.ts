import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';
import { servicePegawai } from '../services';

const menu = new MenuTemplate<MainContext>(async (ctx) => {
  const data = await servicePegawai.getEmployee();

  ctx.session.user = data;

  return {
    parse_mode: 'HTML',
    text: ctx
      .t('info-karyawan', {
        nip: data!.nip,
        username: data!.username,
        nama_pegawai: data!.nama_pegawai,
        jabatan: data!.jabatan,
        gaji_pokok: data!.gaji_pokok,
        tunjangan: data!.tunjangan,
        total_gaji: data!.total_gaji,
        masa_kerja: data!.masa_kerja,
        aktif: data!.aktif ? 'Aktif' : 'Tidak Aktif',
        sisa_cuti: data!.sisa_cuti,
      })
      .toString(),
  };
});

menu.manualRow(menuBack);

export default menu;
