import { MenuTemplate } from 'grammy-inline-menu';
import { MainContext } from '../context';
import { menuBack } from '.';
import { serviceCuti } from '../services';
import moment from 'moment';

const menu = new MenuTemplate<MainContext>(async (ctx) => {
  const data = await serviceCuti.getCuti();
  let joinedString = '';

  if ((data.history_cuti || []).length < 1) {
    return 'Anda belum pernah mengajukan cuti sebelumnya';
  }

  if ((data.history_cuti || []).length > 0) {
    data.history_cuti.forEach((cuti, index) => {
      joinedString += `${index + 1}. ${moment(cuti.tanggal_cuti).format(
        'dddd, D MMMM YYYY',
      )} - ${cuti.alasan_cuti}\n`;
    });
  }

  return `Riwayat cuti anda:\n\n${joinedString}`;
});

const subMenu = new MenuTemplate<MainContext>(async (ctx) => {
  return 'Silakan kirimkan pengajuan cuti Anda melalui pesan teks';
});

menu.submenu('✉️ Ajukan Cuti', 'pengajuan-cuti', subMenu);

menu.manualRow(menuBack);
subMenu.manualRow(menuBack);

export default menu;
